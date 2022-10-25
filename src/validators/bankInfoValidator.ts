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
  bankSortCode: string;

  @IsNotEmpty()
  @IsEthereumAddress()
  userWalletAddress: string;

  @IsString()
  bankAddress?: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsString()
  IBANNumber?: string;

  @IsNotEmpty()
  @IsString()
  accountHolderAddress: string;
}
