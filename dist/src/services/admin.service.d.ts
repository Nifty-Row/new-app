import { ImageService } from 'src/services/image.service';
import { SliderImages } from './../interfaces';
export declare class AdminService {
    private imageService;
    private sliderImageRepository;
    constructor(imageService: ImageService);
    uploadSliderImage(images: SliderImages): Promise<{
        firstSlideImageUrl: string;
        secondSlideImageUrl: string;
        thirdSlideImageUrl: string;
    }>;
}
