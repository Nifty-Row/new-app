import { addBankInfoDto } from './../validators/bankInfoValidator';
import { BankInfo } from 'src/models/bankInfo.entity';
import { Repository } from 'typeorm';
import { Response } from './../../utils';
export declare class BankInfoService {
    bankInfoRepository: Repository<BankInfo>;
    addBankInfo(data: addBankInfoDto): Promise<Response>;
    getBankInfo(userWalletAddress: string): Promise<Response>;
    editBankInfo(data: addBankInfoDto): Promise<Response>;
}
