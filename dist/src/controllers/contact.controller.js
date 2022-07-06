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
exports.ContactController = void 0;
const contactValidator_1 = require("./../validators/contactValidator");
const contact_service_1 = require("./../services/contact.service");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async sendMessage(user) {
        try {
            const { status, message, data } = await this.contactService.contact(user);
            if (status == 'failed')
                return utils_1.ResponseUtils.getErrorResponse(message, data);
            return utils_1.ResponseUtils.getSuccessResponse(data, message);
        }
        catch (error) {
            return utils_1.ResponseUtils.getErrorResponse(error.message, []);
        }
    }
    async subscribeTONewsletter(body) {
        try {
            const { status, message, data } = await this.contactService.subscribeTONewsletter(body.email);
            if (status == 'failed')
                return utils_1.ResponseUtils.getErrorResponse(message, data);
            return utils_1.ResponseUtils.getSuccessResponse(data, message);
        }
        catch (error) {
            return utils_1.ResponseUtils.getErrorResponse(error.message, []);
        }
    }
};
__decorate([
    (0, common_1.Post)('send-message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contactValidator_1.contactDTO]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('subscribe-to-newsletter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "subscribeTONewsletter", null);
ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map