import { SliderImages } from './../interfaces';
import { createUserDto } from './../validators/authValidator';
import { AuthService } from './../services/auth.service';
import { Response, ResponseUtils } from './../../utils';
import { AdminService } from './../services/admin.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as express from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/interfaces';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  @Get('all-users')
  @Roles(Role.Admin, Role.SuperAdmin)
  async getAllUsers(@Request() req: express.Request): Promise<any> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.getAllUsers()
    );
  }

  @Get('add-admin-user')
  @Roles(Role.SuperAdmin)
  async addAdminUser(
    @Request() req: express.Request,
    @Body() user: createUserDto
  ): Promise<any> {
    try {
      const { status, message, data } = await this.authService.register(user);

      if (status == 'failed')
        return ResponseUtils.getErrorResponse(message, data);

      return ResponseUtils.getSuccessResponse(data, message);
    } catch (error) {
      return ResponseUtils.getErrorResponse(error.message, []);
    }
  }

  @Post('/slider-images')
  @Roles(Role.Admin, Role.SuperAdmin)
  async uploadSliderImage(@Body() images: SliderImages): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.uploadSliderImage(images)
    );
  }

  @Put('update-slider-image')
  @Roles(Role.Admin, Role.SuperAdmin)
  async updateSliderImage(@Body() images: SliderImages): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.updateSliderImage(images)
    );
  }

  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  async getAll(): Promise<Response> {
    return ResponseUtils.getSuccessResponse(await this.adminService.getAll());
  }
}
