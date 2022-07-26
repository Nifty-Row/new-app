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
exports.BankInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bankInfo_entity_1 = require("../models/bankInfo.entity");
const typeorm_2 = require("typeorm");
let BankInfoService = class BankInfoService {
    async addBankInfo(data) {
        const { bankAccountNumber, bankShortCode, bankName, userWalletAddress } = data;
        const bankInfo = await this.bankInfoRepository.save({
            bankName,
            bankAccountNumber,
            bankShortCode,
            userWalletAddress,
        });
        return {
            data: bankInfo,
            status: 'success',
            message: 'Bank information added successfully',
        };
    }
    async getBankInfo(userWalletAddress) {
        const bankInfo = await this.bankInfoRepository.findOne({
            userWalletAddress,
        });
        if (bankInfo) {
            return {
                data: bankInfo,
                status: 'success',
                message: 'Bank information fetched successfully',
            };
        }
        return {
            data: [],
            status: 'failed',
            message: "User doesn't have any bank information",
        };
    }
    async editBankInfo(data) {
        const { bankAccountNumber, bankShortCode, bankName, userWalletAddress } = data;
        const currentBankInfo = await this.bankInfoRepository.findOne({
            userWalletAddress,
        });
        if (!currentBankInfo) {
            return {
                data: [],
                status: 'failed',
                message: "User doesn't have any bank information",
            };
        }
        const bankInfo = await this.bankInfoRepository.update({ id: currentBankInfo.id }, {
            bankName,
            bankAccountNumber,
            bankShortCode,
            userWalletAddress,
        });
        return {
            data: bankInfo,
            status: 'success',
            message: 'Bank information updated successfully',
        };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(bankInfo_entity_1.BankInfo),
    __metadata("design:type", typeorm_2.Repository)
], BankInfoService.prototype, "bankInfoRepository", void 0);
BankInfoService = __decorate([
    (0, common_1.Injectable)()
], BankInfoService);
exports.BankInfoService = BankInfoService;
//# sourceMappingURL=bank.service.js.map