import { Newsletter } from './../models/contant.entity';
import { Social } from './../models/social.entity';
import { User } from './../models/user.entity';
import { ImageService } from 'src/services/image.service';
import { SliderImages } from './../interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SliderImage } from 'src/models/sliderImage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  @InjectRepository(User) private userRepository: Repository<User>;
  @InjectRepository(Newsletter) newsletterRepository: Repository<Newsletter>;

  @InjectRepository(SliderImage)
  private sliderImageRepository: Repository<SliderImage>;

  @InjectRepository(Social) private socialRepository: Repository<Social>;

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

  async updateSliderImage(images: SliderImages): Promise<any> {
    const { firstSlide, secondSlide, thirdSlide } = images;

    const currentImages = await this.sliderImageRepository.find({ id: 1 });

    if (currentImages.length < 1) {
      return { status: 'failed', message: 'no images' };
    }

    let firstSlideImageUrl = null;
    let secondSlideImageUrl = null;
    let thirdSlideImageUrl = null;

    if (firstSlide) {
      firstSlideImageUrl = await this.imageService.uploadAssetImage(
        firstSlide,
        `images/slider`
      );

      await this.sliderImageRepository.update(
        { id: currentImages[0].id },
        { firstSlide: firstSlideImageUrl }
      );
    }

    if (secondSlide) {
      secondSlideImageUrl = await this.imageService.uploadAssetImage(
        secondSlide,
        `images/slider`
      );

      await this.sliderImageRepository.update(
        { id: currentImages[0].id },
        { secondSlide: secondSlideImageUrl }
      );
    }

    if (thirdSlide) {
      thirdSlideImageUrl = await this.imageService.uploadAssetImage(
        thirdSlide,
        `images/slider`
      );

      await this.sliderImageRepository.update(
        { id: currentImages[0].id },
        { thirdSlide: thirdSlideImageUrl }
      );
    }

    return { status: true, message: 'Image(s) updated successfully' };
  }

  async getAllSliderImages(): Promise<any> {
    const images = await this.sliderImageRepository.find({ id: 1 });

    return { images };
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userRepository.find({});

    return { users };
  }

  async changeSubscriberStatus(details: any): Promise<any> {
    const subscriberExists = await this.newsletterRepository.findOne({
      email: details.email,
    });

    if (!subscriberExists)
      return {
        status: 'failed',
        message: 'subscriber does not exist',
        data: [],
      };

    await this.newsletterRepository.update(
      { email: details.email },
      { status: details.status }
    );

    return {
      status: 'success',
      message: '',
      data: [],
    };
  }
}
