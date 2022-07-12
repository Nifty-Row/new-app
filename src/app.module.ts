import { PhotoModule } from './modules/photo.module';
import { ContactModule } from './modules/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ContactModule,
    PhotoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
