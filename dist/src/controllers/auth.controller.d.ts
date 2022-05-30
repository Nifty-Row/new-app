import { createUserDto } from './../validators/authValidator';
import { AuthService } from './../services/auth.service';
import { Response } from 'utils';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    default(): Promise<string>;
    register(user: createUserDto): Promise<Response>;
    login(req: any): Promise<Response>;
}
