"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankInfoModule = void 0;
const bankInfo_entity_1 = require("./../models/bankInfo.entity");
const bank_service_1 = require("./../services/bank.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const bank_controller_1 = require("../controllers/bank.controller");
let BankInfoModule = class BankInfoModule {
};
BankInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bankInfo_entity_1.BankInfo]), config_1.ConfigModule.forRoot()],
        controllers: [bank_controller_1.BankInfoController],
        providers: [bank_service_1.BankInfoService],
    })
], BankInfoModule);
exports.BankInfoModule = BankInfoModule;
//# sourceMappingURL=bank.module.js.map