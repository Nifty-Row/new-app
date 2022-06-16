import { UserPhoto as UserPhotoInterface } from 'src/interfaces';
import { AuthService } from '../services/auth.service';
import { createUserDto } from './../validators/authValidator';
import { UserPhoto } from './../models/userPhoto.entity';
import { ImageService } from '../services/image.service';
import { User } from './../models/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private imageService;
    private readonly authService;
    private userRepository;
    private socialRepository;
    private userFollower;
    photoRepository: Repository<UserPhoto>;
    constructor(imageService: ImageService, authService: AuthService);
    findOne(userWalletAddress: string): Promise<User>;
    update(userWalletAddress: string, userDetails: createUserDto): Promise<object>;
    follow(userAddress: string, followUserAddress: string): Promise<string>;
    uploadProfilePicture(walletAddress: string, images: UserPhotoInterface): Promise<{
        coverImageUrl: string;
        displayImageUrl: string;
    }>;
}
