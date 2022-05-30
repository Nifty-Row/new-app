import { UserPhoto, UserSocial } from 'src/interfaces';
export declare class createUserDto {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    walletAddress: string;
    about: string;
    webUrl: string;
    social: UserSocial;
    photo: UserPhoto;
    password?: string;
    type?: string;
}
export declare class loginUserDto {
    email: string;
    password: string;
}
