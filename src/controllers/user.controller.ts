import { ShippingInfo } from './../models/shippingInfo.entity';
import { UserPhoto as UserPhotoInterface } from 'src/interfaces';
import { createUserDto } from './../validators/authValidator';
import { ResponseUtils, Response } from '../../utils';
import { UserService } from '../services/user.service';
import {
  Controller,
  Post,
  Get,
  Request,
  Body,
  Param,
  Put,
  Headers,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async default() {
    return 'Hello World';
  }

  @Get('profile')
  private async getProfile(
    @Request() req,
    @Headers('walletAddress') userWalletAddress
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.findOne(userWalletAddress),
      'User fetched successfully'
    );
  }

  @Post(':userWalletAddress')
  async update(
    @Body() user: createUserDto,
    @Param('userWalletAddress') userWalletAddress: string
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.update(userWalletAddress, user),
      'Your profile was updated successfully'
    );
  }

  @Get('/get-user-by-type/:type')
  async getUserByType(
    @Param('type') type: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.getUserByType(
        {
          page,
          limit,
          route: '/v3/assets',
        },
        type
      )
    );
  }

  @Post('/:userWalletAddress/profile-pic')
  async updateProfileImages(
    @Body() images: UserPhotoInterface,
    @Param('userWalletAddress') userWalletAddress: string
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.uploadProfilePicture(userWalletAddress, images),
      'Your profile picture was updated successfully'
    );
  }

  @Post('/:userWalletAddress/type')
  async updateUserType(
    @Param('userWalletAddress') userWalletAddress: string
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.updateUserType(userWalletAddress),
      'user type was updated successfully'
    );
  }

  @Post('follow/:followUserAddress')
  async follow(
    @Param('followUserAddress') followUserAddress: string,
    @Request() req,
    @Headers('walletAddress') userWalletAddress
  ) {
    return ResponseUtils.getSuccessResponse(
      await this.userService.follow(userWalletAddress, followUserAddress)
    );
  }

  @Post('add-shipping-info')
  async addShippingInfo(
    @Request() req,
    @Headers('walletAddress') userWalletAddress,
    @Body() body: ShippingInfo
  ) {
    return ResponseUtils.getSuccessResponse(
      await this.userService.addShippingInfo(userWalletAddress, body)
    );
  }

  @Get('get-shipping-info')
  async getShippingInfo(
    @Request() req,
    @Headers('walletAddress') userWalletAddress
  ) {
    return ResponseUtils.getSuccessResponse(
      await this.userService.getShippingInfo(userWalletAddress)
    );
  }
}
