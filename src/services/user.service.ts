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

@Injectable()
export class UserService {
  @InjectRepository(User) private userRepository: Repository<User>;
  @InjectRepository(Social) private socialRepository: Repository<Social>;
  @InjectRepository(UserFollower)
  private userFollower: Repository<UserFollower>;
  @InjectRepository(UserPhoto) photoRepository: Repository<UserPhoto>;

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
          photo,
        } = userDetails;

        let photos;

        let user = await this.userRepository
          .createQueryBuilder('user')
          .where('walletAddress = :wa', { wa: userWalletAddress })
          .getOne();

        let userPhotos = await this.photoRepository
          .createQueryBuilder('userPhoto')
          .where('walletAddress = :wa', { wa: userWalletAddress })
          .getOne();

        if (!user) {
          const { message, status, data } = await this.authService.register(
            userDetails
          );

          if (status == 'failed') reject({ message });

          resolve({ message, status, data });
        }

        if (social) {
          await this.socialRepository.update({ walletAddress }, social);
        }

        if (photo) {
          let displayImage = await this.imageService.uploadAssetImage(
            photo.displayImage
          );

          let coverImage = await this.imageService.uploadAssetImage(
            photo.coverImage
          );

          photos = {
            coverImage:
              coverImage == '11111111111' ? userPhotos.coverImage : coverImage,
            displayImage:
              displayImage == '11111111111'
                ? userPhotos.displayImage
                : displayImage,
          };

          await this.photoRepository.update({ walletAddress }, photos);
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
            type: type ? type : 'fiat-user',
            password:
              password != '' || password != null ? hashPassword(password) : '',
            webUrl,
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
}
