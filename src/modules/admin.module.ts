import { ContactUs, Newsletter } from './../models/contant.entity';
import { ContactService } from './../services/contact.service';
import { AuthModule } from './auth.module';
import { AdminService } from './../services/admin.service';
import { SliderImage } from './../models/sliderImage.entity';
import { AdminController } from './../controllers/admin-controller';
import { ImageService } from '../services/image.service';
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
  controllers: [AdminController],
  providers: [AdminService, ImageService, ContactService],
  exports: [AdminService],
})
export class AdminModule {}
