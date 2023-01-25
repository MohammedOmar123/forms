import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities/users.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({ secret: 'JWT_KEY' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
