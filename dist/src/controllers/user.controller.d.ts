import { User } from './../models/user.entity';
import { Response } from '../../utils';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    default(): Promise<string>;
    private getProfile;
    update(user: User, userWalletAddress: string): Promise<Response>;
    follow(followUserAddress: string, req: any, userWalletAddress: any): Promise<Response>;
}
