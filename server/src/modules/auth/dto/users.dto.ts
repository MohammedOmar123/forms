import {
  IsNotEmpty,
  IsEmail,
  IsIn,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';
import { IsAbove18YearsOld } from '../decorator/isAbove18.decorator';

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/, {
    message: `password must be at least 8 characters long and contain at least 1 uppercase letter, 1 special character and 1 number`,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsDateString()
  @IsAbove18YearsOld({ message: 'user age should be above 18' })
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['business', 'individual'])
  role: string;
}
