import { AdminService } from './../services/admin.service';
import { ResponseUtils, Response } from './../../utils';
import { SliderImages } from './../interfaces';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('photos')
export class PhotoController {
  constructor(private adminService: AdminService) {}

  @Post('/slider-images')
  async updateProfileImages(@Body() images: SliderImages): Promise<Response> {
    return ResponseUtils.getSuccessResponse(
      await this.adminService.uploadSliderImage(images)
    );
  }
}
