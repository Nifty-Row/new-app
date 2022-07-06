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
exports.UserController = void 0;
const authValidator_1 = require("./../validators/authValidator");
const utils_1 = require("../../utils");
const user_service_1 = require("../services/user.service");
const common_1 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async default() {
        return 'Hello World';
    }
    async getProfile(req, userWalletAddress) {
        return utils_1.ResponseUtils.getSuccessResponse(await this.userService.findOne(userWalletAddress), 'User fetched successfully');
    }
    async update(user, userWalletAddress) {
        return utils_1.ResponseUtils.getSuccessResponse(await this.userService.update(userWalletAddress, user), 'Your profile was updated successfully');
    }
    async getUserByType(type, page, limit) {
        return utils_1.ResponseUtils.getSuccessResponse(await this.userService.getUserByType({
            page,
            limit,
            route: '/v3/assets',
        }, type));
    }
    async updateProfileImages(images, userWalletAddress) {
        return utils_1.ResponseUtils.getSuccessResponse(await this.userService.uploadProfilePicture(userWalletAddress, images), 'Your profile picture was updated successfully');
    }
    async follow(followUserAddress, req, userWalletAddress) {
        return utils_1.ResponseUtils.getSuccessResponse(await this.userService.follow(userWalletAddress, followUserAddress));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "default", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('/:userWalletAddress'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userWalletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authValidator_1.createUserDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/get-user-by-type/:type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByType", null);
__decorate([
    (0, common_1.Put)('/:userWalletAddress/profile-pic'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userWalletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfileImages", null);
__decorate([
    (0, common_1.Post)('follow/:followUserAddress'),
    __param(0, (0, common_1.Param)('followUserAddress')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map