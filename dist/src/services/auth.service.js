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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const image_service_1 = require("../services/image.service");
const userPhoto_entity_1 = require("./../models/userPhoto.entity");
const social_entity_1 = require("./../models/social.entity");
const user_service_1 = require("./user.service");
const utils_1 = require("./../../utils");
const user_entity_1 = require("./../models/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService, imageService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.imageService = imageService;
    }
    async register(userDetails) {
        const { firstName, lastName, username, email, password, walletAddress, about, type, social, webUrl, photo, } = userDetails;
        let joinDate = new Date();
        let userSocials;
        let userPhoto;
        let photos;
        if (!password)
            return {
                data: [],
                message: 'password is required',
                status: 'failed',
            };
        const emailExists = await this.userRepository.findOne({ email });
        if (emailExists)
            return {
                data: [],
                message: 'email address already exists',
                status: 'failed',
            };
        const usernameExists = await this.userRepository.findOne({ username });
        if (usernameExists)
            return {
                data: [],
                message: 'username already taken',
                status: 'failed',
            };
        if (social) {
            userSocials = await this.socialRepository.save(Object.assign({ walletAddress }, social));
        }
        if (photo) {
            const displayImage = await this.imageService.uploadAssetImage(photo.displayImage);
            const coverImage = await this.imageService.uploadAssetImage(photo.coverImage);
            photos = {
                walletAddress,
                coverImage,
                displayImage,
            };
            userPhoto = await this.photoRepository.save(photos);
        }
        const user = await this.userRepository.save({
            firstName: firstName.toLocaleLowerCase(),
            lastName: lastName.toLocaleLowerCase(),
            username,
            email: email.toLocaleLowerCase(),
            password: (0, utils_1.hashPassword)(password),
            walletAddress,
            about,
            type,
            joinDate,
            webUrl,
        });
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            walletAddress: user.walletAddress,
            type: user.type,
            isActive: user.isActive,
            about,
            social,
            webUrl,
            photos,
        };
        const response = {
            data: payload,
            message: 'Your account was created successfully',
            status: 'success',
        };
        return response;
    }
    async login(user) {
        return {
            walletAddress: user.walletAddress,
        };
    }
    async validateUser(email, password) {
        const user = await this.userService.findOne(email);
        if (user && (0, utils_1.comparePassword)(password, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], AuthService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(social_entity_1.Social),
    __metadata("design:type", typeorm_2.Repository)
], AuthService.prototype, "socialRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(userPhoto_entity_1.UserPhoto),
    __metadata("design:type", typeorm_2.Repository)
], AuthService.prototype, "photoRepository", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        image_service_1.ImageService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map