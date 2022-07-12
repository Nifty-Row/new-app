import { AdminService } from './../services/admin.service';
import { SliderImage } from './../models/sliderImage.entity';
import { PhotoController } from './../controllers/photo.controller';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SliderImage]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PhotoController],
  providers: [AdminService],
})
export class PhotoModule {}
