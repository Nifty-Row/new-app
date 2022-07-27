import { addBankInfoDto } from './../validators/bankInfoValidator';
import { BankInfoService } from './../services/bank.service';
import { Controller, Post, Get, Body, Headers, Put } from '@nestjs/common';
import { Response, ResponseUtils } from 'utils';

@Controller('bank-account')
export class BankInfoController {
  constructor(private bankService: BankInfoService) {}

  @Get()
  async default() {
    return 'Hello World';
  }

  @Post('add-bank-info')
  async addBankInfo(@Body() userBankInfo: addBankInfoDto): Promise<Response> {
    try {
      const { status, message, data } = await this.bankService.addBankInfo(
        userBankInfo
      );

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Get('get-bank-info')
  async getBankInfo(
    @Headers('walletAddress') userWalletAddress: string
  ): Promise<Response> {
    try {
      const { status, message, data } = await this.bankService.getBankInfo(
        userWalletAddress
      );

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Post('update-bank-info')
  async updateBankInfo(
    @Body() userBankInfo: addBankInfoDto
  ): Promise<Response> {
    try {
      const { status, message, data } = await this.bankService.editBankInfo(
        userBankInfo
      );

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }
}
