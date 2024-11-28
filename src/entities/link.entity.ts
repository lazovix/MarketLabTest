import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { LinkInterface } from '@market-lab-test/interfaces';

@Entity('link')
export class LinkEntity implements LinkInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'text', unique: true })
  hash: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
