export declare class ResponseUtils {
    static getSuccessResponse(data: any, message?: string): Response;
    static getErrorResponse(message?: string, data?: []): Response;
}
export declare class Response {
    status: string;
    message: string;
    data: any;
}
export declare const hashPassword: (password: string) => string;
export declare const comparePassword: (password: any, hashedPassword: any) => boolean;
export declare const generateFreshUserTokens: (user: object) => Promise<{
    accessToken: string;
}>;
