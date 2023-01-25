import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';
import { UsersDto } from './users.dto';

export class IndividualDto extends UsersDto {
  @IsNotEmpty()
  @IsBoolean()
  havingExperience: boolean;

  @IsOptional()
  @IsString()
  yourExperience: string;
}
