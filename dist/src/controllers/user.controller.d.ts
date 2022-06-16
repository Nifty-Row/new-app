import { UserPhoto as UserPhotoInterface } from 'src/interfaces';
import { createUserDto } from './../validators/authValidator';
import { Response } from '../../utils';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    default(): Promise<string>;
    private getProfile;
    update(user: createUserDto, userWalletAddress: string): Promise<Response>;
    updateProfileImages(images: UserPhotoInterface, userWalletAddress: string): Promise<Response>;
    follow(followUserAddress: string, req: any, userWalletAddress: any): Promise<Response>;
}
