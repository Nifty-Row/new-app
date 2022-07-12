import { ImageService } from 'src/services/image.service';
import { SliderImages } from './../interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SliderImage } from 'src/models/sliderImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  @InjectRepository(SliderImage)
  private sliderImageRepository: Repository<SliderImage>;

  constructor(private imageService: ImageService) {}

  async uploadSliderImage(images: SliderImages): Promise<{
    firstSlideImageUrl: string;
    secondSlideImageUrl: string;
    thirdSlideImageUrl: string;
  }> {
    const { firstSlide, secondSlide, thirdSlide } = images;

    let firstSlideImageUrl = null;
    let secondSlideImageUrl = null;
    let thirdSlideImageUrl = null;

    if (firstSlide) {
      firstSlideImageUrl = await this.imageService.uploadAssetImage(
        firstSlide,
        `images/slider`
      );
    }

    if (secondSlide) {
      secondSlideImageUrl = await this.imageService.uploadAssetImage(
        secondSlide,
        `images/slider`
      );
    }

    if (thirdSlide) {
      thirdSlideImageUrl = await this.imageService.uploadAssetImage(
        thirdSlide,
        `images/slider`
      );
    }

    await this.sliderImageRepository.save({
      firstSlide: firstSlideImageUrl,
      secondSlide: secondSlideImageUrl,
      thirdSlide: thirdSlideImageUrl,
    });

    return { firstSlideImageUrl, secondSlideImageUrl, thirdSlideImageUrl };
  }
}
