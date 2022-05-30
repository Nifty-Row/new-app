import { UserFollower } from './../models/userFollower.entity';
import { Social } from './../models/social.entity';
import { User } from './../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from './../controllers/user.controller';
import { Module } from '@nestjs/common';
import { ImageService } from 'src/services/image.service';
import { UserPhoto } from 'src/models/userPhoto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Social, UserFollower, UserPhoto])],
  controllers: [UserController],
  providers: [UserService, ImageService],
  exports: [UserService],
})
export class UserModule {}
