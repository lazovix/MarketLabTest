import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from '@market-lab-test/configs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './modules/link';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
