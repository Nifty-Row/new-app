import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class addBankInfoDto {
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsNumber()
  bankAccountNumber: number;

  @IsNotEmpty()
  @IsString()
  bankShortCode: string;

  @IsNotEmpty()
  @IsEthereumAddress()
  userWalletAddress: string;
}
