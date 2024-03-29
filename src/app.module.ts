import { ImageModule } from './modules/image.module';
import { ShippingInfoModule } from './modules/shipping-info.module';
import { AdminModule } from './modules/admin.module';
import { BankInfoModule } from './modules/bank.module';
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
    BankInfoModule,
    AdminModule,
    ShippingInfoModule,
    ImageModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
