import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BinaryLike, createHash } from 'crypto';
import { resolve } from 'url';

import { LinkEntity } from '@market-lab-test/entities';

@Injectable()
export class LinkService {
  private readonly linkPrefix: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
  ) {
    this.linkPrefix = this.configService.get('LINK_PREFIX');
  }

  private getHash(data: BinaryLike): string {
    return createHash('sha1').update(data).digest('hex');
  }

  async create(text: string): Promise<string> {
    const hash = this.getHash(`${Date.now()}.${text}`);

    await this.linkRepository.save({ hash, text });

    return resolve(this.linkPrefix, hash);
  }

  async read(hash: string): Promise<string> {
    const result = await this.linkRepository
      .createQueryBuilder()
      .update()
      .set({ active: false })
      .where({ hash, active: true })
      .returning('*')
      .execute();

    return result?.raw[0]?.text;
  }
}
