import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { BusinessDto, IndividualDto } from '../dto';

export const checkUserRoleAndValidateDto = async (
  body: IndividualDto | BusinessDto,
) => {
  const { role } = body;
  let DTO: any;
  if (role === 'individual') {
    DTO = IndividualDto;
  } else if (role === 'business') {
    DTO = BusinessDto;
  } else {
    throw new BadRequestException('Invalid role');
  }
  const dto: any = plainToInstance(DTO, body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    const messages = errors.map((error) => Object.values(error.constraints)[0]);
    // return the validation errors
    throw new BadRequestException(messages);
  }
};
