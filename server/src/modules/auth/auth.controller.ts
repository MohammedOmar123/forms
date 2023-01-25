import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BusinessDto, IndividualDto } from './dto';
import { checkUserRoleAndValidateDto } from './utilities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async create(@Body() body: IndividualDto | BusinessDto) {
    await checkUserRoleAndValidateDto(body);
    return this.authService.create(body);
  }
}
