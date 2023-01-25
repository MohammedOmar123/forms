import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { IndividualDto, BusinessDto } from './dto';
import { User } from './entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async create(dto: IndividualDto | BusinessDto) {
    const isEmailExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email already in use');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userRepository.create({
      ...dto,
      password: hash,
    });

    const token = this.generateToken(newUser.id, newUser.email, newUser.role);
    return token;
  }

  async generateToken(userId: number, email: string, role: string) {
    const secret = this.config.get('JWT_KEY');
    const payload = { sub: userId, email, role };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret,
    });
    return { access_token };
  }
}
