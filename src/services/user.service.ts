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
          .where('walletAddress = :wa', { wa: userWalletAddress })
          .leftJoinAndSelect('user.social', 'social')
          .leftJoinAndSelect('user.photo', 'photo')
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

        let userSocials;
        let userPhotos;
        let photos;

        let user = await this.userRepository
          .createQueryBuilder('user')
          .where('walletAddress = :wa', { wa: userWalletAddress })
          .leftJoinAndSelect('user.photo', 'photo')
          .leftJoinAndSelect('user.social', 'social')
          .getOne();

        if (!user) {
          const { message, status, data } = await this.authService.register(
            userDetails
          );

          if (status == 'failed') reject({ message });

          resolve({ message, status, data });
        }

        if (social) {
          const existingUserSocial = await this.socialRepository.findOne({
            id: user.social.id,
          });

          if (existingUserSocial) {
            await this.socialRepository.update(
              { id: existingUserSocial.id },
              social
            );
          } else {
            userSocials = await this.socialRepository.save(social);
          }
        }

        if (photo) {
          const displayImage: string = await this.imageService.uploadAssetImage(
            photo.displayImage
          );

          const coverImage: string = await this.imageService.uploadAssetImage(
            photo.coverImage
          );

          photos = {
            coverImage,
            displayImage,
          };

          const existingUserPhoto = await this.photoRepository.findOne({
            id: user.photo.id,
          });

          if (existingUserPhoto) {
            await this.photoRepository.update(
              { id: existingUserPhoto.id },
              photos
            );
          } else {
            userPhotos = await this.photoRepository.save(photos);
          }
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
            type: type ? type : 'fait-user',
            password:
              password != '' || password != null ? hashPassword(password) : '',
            webUrl,
          }
        );

        if (userPhotos) {
          await this.userRepository.update(
            { id: user.id },
            {
              photo: userPhotos,
            }
          );
        }

        if (userSocials) {
          await this.userRepository.update(
            { id: user.id },
            {
              social: userSocials,
            }
          );
        }

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
