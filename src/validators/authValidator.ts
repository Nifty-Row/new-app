import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { UserSocial } from 'src/interfaces';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[_]{0,5}[a-zA-Z0-9]+[-_.]{0,1}[a-zA-Z0-9]+[_]{0,5}$/)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEthereumAddress()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  webUrl: string;

  @IsNotEmptyObject()
  @IsObject()
  social: UserSocial;

  password?: string;

  type?: string;
}

export class loginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
