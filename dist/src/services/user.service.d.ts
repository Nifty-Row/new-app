import { UserPhoto as UserPhotoInterface } from 'src/interfaces';
import { AuthService } from '../services/auth.service';
import { createUserDto } from './../validators/authValidator';
import { UserPhoto } from './../models/userPhoto.entity';
import { ImageService } from '../services/image.service';
import { User } from './../models/user.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private imageService;
    private readonly authService;
    private userRepository;
    private socialRepository;
    private userFollower;
    photoRepository: Repository<UserPhoto>;
    constructor(imageService: ImageService, authService: AuthService);
    findOne(userWalletAddress: string): Promise<User>;
    getUserByEmail(email: string): Promise<any>;
    getUserByType(options: IPaginationOptions, type: string): Promise<Pagination<User>>;
    update(userWalletAddress: string, userDetails: createUserDto): Promise<object>;
    follow(userAddress: string, followUserAddress: string): Promise<string>;
    uploadProfilePicture(walletAddress: string, images: UserPhotoInterface): Promise<{
        coverImageUrl: string;
        displayImageUrl: string;
    }>;
}
