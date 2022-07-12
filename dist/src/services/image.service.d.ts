export declare class ImageService {
    private readonly logger;
    constructor();
    uploadAssetImage(b64Image: string, folder: string): Promise<string>;
}
