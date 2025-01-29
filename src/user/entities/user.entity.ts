import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/entities/role.entity';
import { Church } from 'src/church/entities/church.entity';
import { House } from 'src/house/entities/house.entity';
import { QueueRegister } from '../../queue-user-registration/entities/queue-register.entity';
import { ForgotPassword } from 'src/forgot-password/entities/forgot-password.entity';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';

@Entity('Users')
export class User {
  // constructor(
  //   email: string,
  //   username: string,
  //   password: string,
  //   avatar?: string,
  //   prefix?: string,
  //   number?: string,
  //   social?: string,
  //   fkRoleId?: Role,
  //   fkChurchId?: Church,
  // ) {
  //   this.email = email;
  //   this.username = username;
  //   this.password = password;
  //   this.avatar = avatar;
  //   this.prefix = prefix;
  //   this.number = number;
  //   this.social = social;
  //   this.fkRoleId = fkRoleId;
  //   this.fkChurchId = fkChurchId;
  // }
  constructor() {}

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  email: string;

  @Column({
    nullable: true,
    default: 'default',
  })
  avatar?: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  prefix?: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: true })
  social?: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password?: string;

  async validatePassword(plainTextPassword: string): Promise<boolean> {
    // Ensure plainTextPassword is defined and a string
    if (!plainTextPassword) {
      throw new Error('Plain text password is required');
    }

    // Assuming this.password contains the hashed password
    if (!this.password) {
      throw new Error('Hashed password is missing');
    }

    try {
      return await bcrypt.compare(plainTextPassword, this.password);
    } catch (error) {
      console.error('Error comparing passwords:', error.message);
      throw error;
    }
  }

  @ManyToOne(() => Role, (role) => role.fkUserId, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'fkRoleId',
      foreignKeyConstraintName: 'fkRoleId',
      referencedColumnName: 'id',
    },
  ])
  fkRoleId: Role;

  @ManyToOne(() => Church, (church) => church.fkUserId, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'fkChurchId',
      foreignKeyConstraintName: 'fkChurchId',
      referencedColumnName: 'id',
    },
  ])
  fkChurchId: Church;

  @OneToMany(() => House, (house: House) => house.fkUserId)
  fkHouseId?: House[];

  @OneToMany(
    () => ForgotPassword,
    (forgotPassword: ForgotPassword) => forgotPassword.fkUserId,
  )
  fkForgotPassword?: ForgotPassword[];

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

  @OneToOne(() => QueueRegister, (queueRegister) => queueRegister.fkUserId, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn([
    {
      name: 'fkQueueRegisterId',
      foreignKeyConstraintName: 'fkQueueRegisterId',
      referencedColumnName: 'id',
    },
  ])
  fkQueueRegisterId: QueueRegister;

  /**
   * @viewAdminChurches will define all the churches this user can see
   * it can be:
   * - 'idChurchX, idChurchY, idChurch..'
   * - 'ALL'
   *
   */
  @Column({ nullable: true })
  viewAdminChurches?: string;

  @OneToMany(
    () => HistorySession,
    (session: HistorySession) => session.fkUserId,
  )
  fkHistorySessions: HistorySession[];
}
