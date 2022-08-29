import { AdminService } from './../services/admin.service';
import { ResponseUtils, Response } from './../../utils';
import { SliderImages } from './../interfaces';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('photos')
export class PhotoController {
  constructor(private adminService: AdminService) {}

  @Post('/slider-images')
  async uploadSliderImage(@Body() images: SliderImages): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.uploadSliderImage(images)
    );
  }

  @Put('update-slider-image')
  async updateSliderImage(@Body() images: SliderImages): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.updateSliderImage(images)
    );
  }

  @Get()
  async getAll(): Promise<Response> {
    return ResponseUtils.getSuccessResponse(await this.adminService.getAll());
  }
}
