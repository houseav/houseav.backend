import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import 'reflect-metadata';

@Entity('Banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  motivation: string;

  //   @Column({ nullable: false })
  //   fkHouseId?: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
    nullable: true,
  })
  updatedAt?: Date;
}
