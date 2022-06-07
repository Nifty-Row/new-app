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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const auth_service_1 = require("../services/auth.service");
const utils_1 = require("./../../utils");
const userPhoto_entity_1 = require("./../models/userPhoto.entity");
const image_service_1 = require("../services/image.service");
const userFollower_entity_1 = require("./../models/userFollower.entity");
const social_entity_1 = require("./../models/social.entity");
const user_entity_1 = require("./../models/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(imageService, authService) {
        this.imageService = imageService;
        this.authService = authService;
    }
    async findOne(userWalletAddress) {
        return new Promise(async (resolve, reject) => {
            try {
                const userProfile = await this.userRepository
                    .createQueryBuilder('user')
                    .where('user.walletAddress = :wa', { wa: userWalletAddress })
                    .leftJoinAndMapOne('user.social', social_entity_1.Social, 'social', 'social.walletAddress = user.walletAddress')
                    .leftJoinAndMapOne('user.photo', userPhoto_entity_1.UserPhoto, 'photo', 'photo.walletAddress = user.walletAddress')
                    .getOne();
                if (!userProfile) {
                    reject({ error: 'user does not exist' });
                }
                resolve(userProfile);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async update(userWalletAddress, userDetails) {
        return new Promise(async (resolve, reject) => {
            try {
                const { firstName, lastName, username, email, password, walletAddress, about, type, social, webUrl, photo, } = userDetails;
                let photos;
                let user = await this.userRepository
                    .createQueryBuilder('user')
                    .where('walletAddress = :wa', { wa: userWalletAddress })
                    .getOne();
                if (!user) {
                    const { message, status, data } = await this.authService.register(userDetails);
                    if (status == 'failed')
                        reject({ message });
                    resolve({ message, status, data });
                }
                if (social) {
                    await this.socialRepository.update({ walletAddress }, social);
                }
                if (photo) {
                    const displayImage = await this.imageService.uploadAssetImage(photo.displayImage);
                    const coverImage = await this.imageService.uploadAssetImage(photo.coverImage);
                    photos = {
                        coverImage,
                        displayImage,
                    };
                    await this.photoRepository.update({ walletAddress }, photos);
                }
                await this.userRepository.update({ id: user.id }, {
                    firstName: firstName.toLocaleLowerCase(),
                    lastName: lastName.toLocaleLowerCase(),
                    username,
                    email: email.toLocaleLowerCase(),
                    walletAddress,
                    about,
                    type: type ? type : 'fait-user',
                    password: password != '' || password != null ? (0, utils_1.hashPassword)(password) : '',
                    webUrl,
                });
                const response = {
                    data: walletAddress,
                };
                resolve(response);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async follow(userAddress, followUserAddress) {
        return new Promise(async (resolve, reject) => {
            try {
                const userFollowing = await this.userFollower.findOne({
                    userAddress,
                    followUserAddress,
                });
                if (userFollowing) {
                    reject('You are already following this user');
                }
                await this.userFollower.save({
                    userAddress,
                    followUserAddress,
                });
                resolve('You have successfully followed this user');
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(social_entity_1.Social),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "socialRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(userFollower_entity_1.UserFollower),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userFollower", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(userPhoto_entity_1.UserPhoto),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "photoRepository", void 0);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [image_service_1.ImageService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map