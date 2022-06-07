import { createUserDto } from './../validators/authValidator';
import { ImageService } from '../services/image.service';
import { UserPhoto } from './../models/userPhoto.entity';
import { Social } from './../models/social.entity';
import { UserService } from './user.service';
import { hashPassword, comparePassword, Response } from './../../utils';
import { User } from './../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @InjectRepository(User) userRepository: Repository<User>;

  @InjectRepository(Social) socialRepository: Repository<Social>;

  @InjectRepository(UserPhoto) photoRepository: Repository<UserPhoto>;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
    private imageService: ImageService
  ) {}

  async register(userDetails: createUserDto): Promise<Response> {
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

    let joinDate = new Date();

    let userSocials;
    let userPhoto;
    let photos;

    if (!password)
      return {
        data: [],
        message: 'password is required',
        status: 'failed',
      };

    const emailExists = await this.userRepository.findOne({ email });

    if (emailExists)
      return {
        data: [],
        message: 'email address already exists',
        status: 'failed',
      };

    const usernameExists = await this.userRepository.findOne({ username });

    if (usernameExists)
      return {
        data: [],
        message: 'username already taken',
        status: 'failed',
      };

    if (social) {
      userSocials = await this.socialRepository.save({
        walletAddress,
        ...social,
      });
    }

    if (photo) {
      const displayImage: string = await this.imageService.uploadAssetImage(
        photo.displayImage
      );

      const coverImage: string = await this.imageService.uploadAssetImage(
        photo.coverImage
      );

      photos = {
        walletAddress,
        coverImage,
        displayImage,
      };

      userPhoto = await this.photoRepository.save(photos);
    }

    const user = await this.userRepository.save({
      firstName: firstName.toLocaleLowerCase(),
      lastName: lastName.toLocaleLowerCase(),
      username,
      email: email.toLocaleLowerCase(),
      password: hashPassword(password),
      walletAddress,
      about,
      type,
      joinDate,
      webUrl,
    });

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      walletAddress: user.walletAddress,
      type: user.type,
      isActive: user.isActive,
      about,
      social,
      webUrl,
      photos,
    };

    const response = {
      data: payload,
      message: 'Your account was created successfully',
      status: 'success',
    };

    return response;
  }

  async login(user: User) {
    return {
      walletAddress: user.walletAddress,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && comparePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
