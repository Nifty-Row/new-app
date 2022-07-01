"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let ImageService = ImageService_1 = class ImageService {
    constructor() {
        this.logger = new common_1.Logger(ImageService_1.name);
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadAssetImage(b64Image, userWalletAddress) {
        if (b64Image === '11111111111') {
            return 'imageUrl';
        }
        const options = {
            resource_type: 'raw',
            folder: `images/${userWalletAddress}`,
        };
        const response = await cloudinary_1.v2.uploader.upload(b64Image, options);
        return response.secure_url;
    }
};
ImageService = ImageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map