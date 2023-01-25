import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';

import config from './core/database/connection';
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...config,
      autoLoadModels: true,
      synchronize: true,
      sync: { force: false },
      models: [],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
