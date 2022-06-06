import { ContactService } from './../services/contact.service';
import { ContactUs, Newsletter } from './../models/contant.entity';
import { ContactController } from './../controllers/contact.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactUs, Newsletter]),
    ConfigModule.forRoot(),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
