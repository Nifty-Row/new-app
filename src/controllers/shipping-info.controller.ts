import { ShippingInfo } from '../models/shippingInfo.entity';
import { ResponseUtils } from '../../utils';
import { UserService } from '../services/user.service';
import {
  Controller,
  Post,
  Get,
  Request,
  Body,
  Headers,
} from '@nestjs/common';

@Controller('shipping-info')
export class ShippingInfoController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async addShippingInfo(
    @Request() req,
    @Headers('walletAddress') userWalletAddress,
    @Body() body: ShippingInfo
  ) {
    return ResponseUtils.getSuccessResponse(
      await this.userService.addShippingInfo(userWalletAddress, body)
    );
  }

  @Get('')
  async getShippingInfo(
    @Request() req,
    @Headers('walletAddress') userWalletAddress
  ) {
    return ResponseUtils.getSuccessResponse(
      await this.userService.getShippingInfo(userWalletAddress)
    );
  }
}
