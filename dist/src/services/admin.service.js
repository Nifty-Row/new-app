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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const image_service_1 = require("./image.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sliderImage_entity_1 = require("../models/sliderImage.entity");
const typeorm_2 = require("typeorm");
let AdminService = class AdminService {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async uploadSliderImage(images) {
        const { firstSlide, secondSlide, thirdSlide } = images;
        let firstSlideImageUrl = null;
        let secondSlideImageUrl = null;
        let thirdSlideImageUrl = null;
        if (firstSlide) {
            firstSlideImageUrl = await this.imageService.uploadAssetImage(firstSlide, `images/slider`);
        }
        if (secondSlide) {
            secondSlideImageUrl = await this.imageService.uploadAssetImage(secondSlide, `images/slider`);
        }
        if (thirdSlide) {
            thirdSlideImageUrl = await this.imageService.uploadAssetImage(thirdSlide, `images/slider`);
        }
        await this.sliderImageRepository.save({
            firstSlide: firstSlideImageUrl,
            secondSlide: secondSlideImageUrl,
            thirdSlide: thirdSlideImageUrl,
        });
        return { firstSlideImageUrl, secondSlideImageUrl, thirdSlideImageUrl };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(sliderImage_entity_1.SliderImage),
    __metadata("design:type", typeorm_2.Repository)
], AdminService.prototype, "sliderImageRepository", void 0);
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map