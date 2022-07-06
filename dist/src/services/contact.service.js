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
exports.ContactService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const contant_entity_1 = require("./../models/contant.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let ContactService = class ContactService {
    constructor() { }
    async contact(contactData) {
        const contactMessage = await this.contactUsRepository.save(contactData);
        return {
            data: contactMessage,
            message: 'message sent successfully',
            status: 'success',
        };
    }
    async subscribeTONewsletter(email) {
        const alreadySubscribed = await this.newsletterRepository.findOne({
            email,
        });
        if (alreadySubscribed)
            return {
                status: 'failed',
                message: 'You are already subscribed to our newsletter',
                data: [],
            };
        await this.newsletterRepository.save({ email });
        return {
            status: 'success',
            message: "you've successfully subscribed to our newsletter",
            data: [],
        };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(contant_entity_1.ContactUs),
    __metadata("design:type", typeorm_2.Repository)
], ContactService.prototype, "contactUsRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(contant_entity_1.Newsletter),
    __metadata("design:type", typeorm_2.Repository)
], ContactService.prototype, "newsletterRepository", void 0);
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map