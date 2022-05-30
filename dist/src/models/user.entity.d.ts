import { UserPhoto } from './userPhoto.entity';
import { Social } from './social.entity';
export declare class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    email: string;
    password: string;
    walletAddress: string;
    type: string;
    about: string;
    joinDate: Date;
    webUrl: string;
    social: Social;
    photo: UserPhoto;
    created_at: Date;
    updated_at: Date;
}
