import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinkEntity } from '@market-lab-test/entities';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
