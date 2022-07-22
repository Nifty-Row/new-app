import { BankInfo } from './../models/bankInfo.entity';
import { BankInfoService } from './../services/bank.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BankInfoController } from 'src/controllers/bank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BankInfo]), ConfigModule.forRoot()],
  controllers: [BankInfoController],
  providers: [BankInfoService],
})
export class BankInfoModule {}
