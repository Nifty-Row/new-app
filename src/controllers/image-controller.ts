import { AdminService } from './../services/admin.service';
import { Controller, Get } from '@nestjs/common';
import { Response, ResponseUtils } from 'utils';

@Controller('images')
export class ImageController {
  constructor(private adminService: AdminService) {}

  @Get('slider-images')
  async getAllSliderImages(): Promise<Response> {
    return ResponseUtils.getSuccessResponse(await this.adminService.getAllSliderImages());
  }
}
