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

  @Put('/:userWalletAddress')
  async update(
    @Body() user: createUserDto,
    @Param('userWalletAddress') userWalletAddress: string
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.update(userWalletAddress, user),
      'Your profile was updated successfully'
    );
  }

  @Put('/:userWalletAddress/profile-pic')
  async updateProfileImages(
    @Body() images: UserPhotoInterface,
    @Param('userWalletAddress') userWalletAddress: string
  ): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.userService.uploadProfilePicture(userWalletAddress, images),
      'Your profile picture was updated successfully'
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
}
