import { UserPhoto } from 'src/models/userPhoto.entity';
import { Social } from './../models/social.entity';
import { UserFollower } from './../models/userFollower.entity';
import { ShippingInfoController } from './../controllers/shipping-info.controller';
import { ShippingInfo } from './../models/shippingInfo.entity';
import { AuthModule } from './auth.module';
import { User } from './../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Social,
      UserFollower,
      UserPhoto,
      ShippingInfo,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ShippingInfoController],
  providers: [UserService],
  exports: [UserService],
})
export class ShippingInfoModule {}
