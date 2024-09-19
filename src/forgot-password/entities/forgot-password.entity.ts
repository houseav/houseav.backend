import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { addHours } from 'date-fns';

@Entity('Forgot-password')
export class ForgotPassword {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.fkForgotPassword, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'fkUserId',
      foreignKeyConstraintName: 'fkUserId',
      referencedColumnName: 'id',
    },
  ])
  fkUserId: User;

  @Column({ nullable: false })
  token: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  timeCreation?: Date;

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

  @BeforeInsert()
  adjustTimeCreation() {
    this.timeCreation = addHours(new Date(), 0); // GMT+2 - UTC time
  }
}
