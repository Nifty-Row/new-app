import { createUserDto } from './../validators/authValidator';
import { ImageService } from '../services/image.service';
import { UserPhoto } from './../models/userPhoto.entity';
import { Social } from './../models/social.entity';
import { UserService } from './user.service';
import { Response } from './../../utils';
import { User } from './../models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private imageService;
    userRepository: Repository<User>;
    socialRepository: Repository<Social>;
    photoRepository: Repository<UserPhoto>;
    constructor(userService: UserService, jwtService: JwtService, imageService: ImageService);
    register(userDetails: createUserDto): Promise<Response>;
    login(user: User): Promise<{
        walletAddress: string;
        userType: string;
        email: string;
        username: string;
    }>;
    validateUser(email: string, password: string): Promise<any>;
}
