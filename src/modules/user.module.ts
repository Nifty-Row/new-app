import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './../services/auth.service';
import { UserFollower } from './../models/userFollower.entity';
import { Social } from './../models/social.entity';
import { User } from './../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from './../controllers/user.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ImageService } from 'src/services/image.service';
import { UserPhoto } from 'src/models/userPhoto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Social, UserFollower, UserPhoto]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
