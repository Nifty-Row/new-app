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
exports.BankInfoController = void 0;
const bankInfoValidator_1 = require("./../validators/bankInfoValidator");
const bank_service_1 = require("./../services/bank.service");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
let BankInfoController = class BankInfoController {
    constructor(bankService) {
        this.bankService = bankService;
    }
    async default() {
        return 'Hello World';
    }
    async addBankInfo(userBankInfo) {
        try {
            const { status, message, data } = await this.bankService.addBankInfo(userBankInfo);
            if (status == 'failed')
                return utils_1.ResponseUtils.getErrorResponse(message, data);
            return utils_1.ResponseUtils.getSuccessResponse(data, message);
        }
        catch (error) {
            return utils_1.ResponseUtils.getErrorResponse(error.message, []);
        }
    }
    async getBankInfo(userWalletAddress) {
        try {
            const { status, message, data } = await this.bankService.getBankInfo(userWalletAddress);
            if (status == 'failed')
                return utils_1.ResponseUtils.getErrorResponse(message, data);
            return utils_1.ResponseUtils.getSuccessResponse(data, message);
        }
        catch (error) {
            return utils_1.ResponseUtils.getErrorResponse(error.message, []);
        }
    }
    async updateBankInfo(userBankInfo) {
        try {
            const { status, message, data } = await this.bankService.editBankInfo(userBankInfo);
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
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankInfoController.prototype, "default", null);
__decorate([
    (0, common_1.Post)('add-bank-info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankInfoValidator_1.addBankInfoDto]),
    __metadata("design:returntype", Promise)
], BankInfoController.prototype, "addBankInfo", null);
__decorate([
    (0, common_1.Get)('get-bank-info'),
    __param(0, (0, common_1.Headers)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankInfoController.prototype, "getBankInfo", null);
__decorate([
    (0, common_1.Put)('update-bank-info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankInfoValidator_1.addBankInfoDto]),
    __metadata("design:returntype", Promise)
], BankInfoController.prototype, "updateBankInfo", null);
BankInfoController = __decorate([
    (0, common_1.Controller)('bank-account'),
    __metadata("design:paramtypes", [bank_service_1.BankInfoService])
], BankInfoController);
exports.BankInfoController = BankInfoController;
//# sourceMappingURL=bank.controller.js.map