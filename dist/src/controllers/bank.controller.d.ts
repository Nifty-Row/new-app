import { addBankInfoDto } from './../validators/bankInfoValidator';
import { BankInfoService } from './../services/bank.service';
import { Response } from 'utils';
export declare class BankInfoController {
    private bankService;
    constructor(bankService: BankInfoService);
    default(): Promise<string>;
    addBankInfo(userBankInfo: addBankInfoDto): Promise<Response>;
    getBankInfo(userWalletAddress: string): Promise<Response>;
    updateBankInfo(userBankInfo: addBankInfoDto): Promise<Response>;
}
