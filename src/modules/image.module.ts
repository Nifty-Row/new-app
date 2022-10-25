import { ImageController } from './../controllers/image-controller';
import { ContactUs, Newsletter } from './../models/contant.entity';
import { AuthModule } from './auth.module';
import { AdminService } from './../services/admin.service';
import { SliderImage } from './../models/sliderImage.entity';
import { Social } from './../models/social.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SliderImage,
      User,
      Social,
      Newsletter,
      ContactUs,
    ]),
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [ImageController],
  providers: [AdminService],
  exports: [AdminService],
})
export class ImageModule {}
