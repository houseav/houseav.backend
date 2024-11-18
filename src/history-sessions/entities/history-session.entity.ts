import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('History-Sessions')
export class HistorySession {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  access_token_expiresAt: Date;

  @Column({ nullable: true })
  refresh_token_expiresAt: Date;

  @Column({ default: false, nullable: false })
  active: boolean;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  invalidateBy: string;

  @Column({ nullable: true })
  invalidateReason: string;

  @Column({ nullable: true })
  expiresAt: Date;

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

  @ManyToOne(() => User, (user: User) => user.fkHistorySessions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fkUserId' })
  fkUserId: User;
}
