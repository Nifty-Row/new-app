import { ShippingInfo } from './../models/shippingInfo.entity';
import { UserPhoto as UserPhotoInterface } from 'src/interfaces';
import { AuthService } from '../services/auth.service';
import { hashPassword } from './../../utils';
import { createUserDto } from './../validators/authValidator';
import { UserPhoto } from './../models/userPhoto.entity';
import { ImageService } from '../services/image.service';
import { UserFollower } from './../models/userFollower.entity';
import { Social } from './../models/social.entity';
import { User } from './../models/user.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  @InjectRepository(User) private userRepository: Repository<User>;
  @InjectRepository(Social) private socialRepository: Repository<Social>;
  @InjectRepository(UserFollower)
  private userFollower: Repository<UserFollower>;
  @InjectRepository(UserPhoto) photoRepository: Repository<UserPhoto>;
  @InjectRepository(ShippingInfo)
  shippingInfoRepository: Repository<ShippingInfo>;

  constructor(
    private imageService: ImageService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async findOne(userWalletAddress: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const userProfile = await this.userRepository
          .createQueryBuilder('user')
          .where('user.walletAddress = :wa', { wa: userWalletAddress })
          .leftJoinAndMapOne(
            'user.social',
            Social,
            'social',
            'social.walletAddress = user.walletAddress'
          )
          .leftJoinAndMapOne(
            'user.photo',
            UserPhoto,
            'photo',
            'photo.walletAddress = user.walletAddress'
          )
          .getOne();

        if (!userProfile) {
          reject({ error: 'user does not exist' });
        }

        resolve(userProfile);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const userProfile = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();

      if (!userProfile) return null;

      return userProfile;
    } catch (error) {
      return error;
    }
  }

  async getUserByType(
    options: IPaginationOptions,
    type: string
  ): Promise<Pagination<User>> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.type = :type', { type })
      .leftJoinAndMapOne(
        'user.photo',
        UserPhoto,
        'photo',
        'photo.walletAddress = user.walletAddress'
      );

    return paginate<User>(users, options);
  }

  async updateUserType(walletAddress: string): Promise<boolean> {
    const user = await this.userRepository.update(
      { walletAddress },
      { type: 'gallery' }
    );

    return true;
  }

  async update(
    userWalletAddress: string,
    userDetails: createUserDto
  ): Promise<object> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          firstName,
          lastName,
          username,
          email,
          password,
          walletAddress,
          about,
          type,
          social,
          webUrl,
          phoneNumber,
        } = userDetails;

        let user = await this.userRepository
          .createQueryBuilder('user')
          .where('walletAddress = :wa', { wa: userWalletAddress })
          .getOne();

        if (!user) {
          const { message, status, data } = await this.authService.register(
            userDetails
          );

          if (status == 'failed') reject({ message });

          resolve({ ...data });
        }

        if (social) {
          await this.socialRepository.update({ walletAddress }, social);
        }

        await this.userRepository.update(
          { id: user.id },
          {
            firstName: firstName.toLocaleLowerCase(),
            lastName: lastName.toLocaleLowerCase(),
            username,
            email: email.toLocaleLowerCase(),
            walletAddress,
            about,
            type: type ? type : 'collector',
            password:
              password != '' || password != null ? hashPassword(password) : '',
            webUrl,
            phoneNumber,
          }
        );

        const response = {
          data: walletAddress,
        };

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async follow(
    userAddress: string,
    followUserAddress: string
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const userFollowing = await this.userFollower.findOne({
          userAddress,
          followUserAddress,
        });

        if (userFollowing) {
          reject('You are already following this user');
        }

        await this.userFollower.save({
          userAddress,
          followUserAddress,
        });

        resolve('You have successfully followed this user');
      } catch (error) {
        reject(error);
      }
    });
  }

  async uploadProfilePicture(
    walletAddress: string,
    images: UserPhotoInterface
  ): Promise<{ coverImageUrl: string; displayImageUrl: string }> {
    let userCurrentPhotos = await this.photoRepository
      .createQueryBuilder('userPhoto')
      .where('walletAddress = :wa', { wa: walletAddress })
      .getOne();

    const { displayImage, coverImage } = images;

    let coverImageUrl = null;
    let displayImageUrl = null;

    if (!userCurrentPhotos) {
      if (coverImage) {
        coverImageUrl = await this.imageService.uploadAssetImage(
          coverImage,
          `images/${walletAddress}`
        );
      }

      if (displayImage) {
        displayImageUrl = await this.imageService.uploadAssetImage(
          displayImage,
          `images/${walletAddress}`
        );
      }

      await this.photoRepository.save({
        walletAddress,
        coverImage: coverImageUrl,
        displayImage: displayImageUrl,
      });
    } else {
      if (coverImage) {
        coverImageUrl = await this.imageService.uploadAssetImage(
          coverImage,
          `images/${walletAddress}`
        );
      } else {
        coverImageUrl = userCurrentPhotos.coverImage;
      }

      if (displayImage) {
        displayImageUrl = await this.imageService.uploadAssetImage(
          displayImage,
          `images/${walletAddress}`
        );
      } else {
        displayImageUrl = userCurrentPhotos.displayImage;
      }

      await this.photoRepository.update(
        {
          walletAddress,
        },
        { coverImage: coverImageUrl, displayImage: displayImageUrl }
      );
    }

    return { coverImageUrl, displayImageUrl };
  }

  async addShippingInfo(userWalletAddress: string, details: ShippingInfo) {
    const userExists = await this.userRepository.find({
      walletAddress: userWalletAddress,
    });

    if (!userExists)
      return {
        status: 'failed',
        message: 'user does not exist',
      };

    const shippingInfo = await this.shippingInfoRepository.create(details);

    return shippingInfo;
  }

  async getShippingInfo(userWalletAddress: string) {
    const shippingInfo = await this.shippingInfoRepository.find({
      userWalletAddress,
    });

    if (!shippingInfo)
      return {
        status: 'failed',
        message: 'you do not have any shipping information',
      };

    return { shippingInfo };
  }
}
