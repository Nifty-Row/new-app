export declare class ImageService {
    private readonly logger;
    constructor();
    uploadAssetImage(b64Image: string, userWalletAddress: string): Promise<string>;
}