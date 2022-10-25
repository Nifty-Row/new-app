import { addBankInfoDto } from './../validators/bankInfoValidator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInfo } from 'src/models/bankInfo.entity';
import { Repository } from 'typeorm';
import { Response } from './../../utils';

@Injectable()
export class BankInfoService {
  @InjectRepository(BankInfo) bankInfoRepository: Repository<BankInfo>;

  async addBankInfo(data: addBankInfoDto): Promise<Response> {
    const bankInfo = await this.bankInfoRepository.save(data);

    return {
      data: bankInfo,
      status: 'success',
      message: 'Bank information added successfully',
    };
  }

  async getBankInfo(userWalletAddress: string): Promise<Response> {
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

  async editBankInfo(data: addBankInfoDto): Promise<Response> {
    const currentBankInfo = await this.bankInfoRepository.findOne({
      userWalletAddress: data.userWalletAddress,
    });

    if (!currentBankInfo) {
      return {
        data: [],
        status: 'failed',
        message: "User doesn't have any bank information",
      };
    }

    const bankInfo = await this.bankInfoRepository.update(
      { id: currentBankInfo.id },
      data
    );

    return {
      data: bankInfo,
      status: 'success',
      message: 'Bank information updated successfully',
    };
  }
}
