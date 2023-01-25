import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

import { UsersDto } from './users.dto';

export class BusinessDto extends PartialType(UsersDto) {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  jopTitle: string;
}
