import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ReferenceLetter } from '../../reference-letter/entities/reference-letter.entity';
import { ADMIN_DASHBOARD_VERIFIER } from 'utils/constants';

@Entity('Queue-Register')
export class QueueRegister {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, default: false })
  verified: boolean;

  /**
   *
   * @ADMIN_DASHBOARD_VERIFIER will define what is able to see in the admin views
   * it can be:
   * - admin
   * - super-admin
   *
   */
  @Column({ type: 'enum', enum: ADMIN_DASHBOARD_VERIFIER, nullable: true })
  adminVerifier?: ADMIN_DASHBOARD_VERIFIER;

  @OneToOne(() => User, (user) => user.fkQueueRegisterId)
  @JoinColumn([
    {
      name: 'fkUserId',
      foreignKeyConstraintName: 'fkUserId',
      referencedColumnName: 'id',
    },
  ])
  fkUserId: User;

  @OneToOne(
    () => ReferenceLetter,
    (referenceLetter) => referenceLetter.fkQueueRegisterId,
  )
  @JoinColumn([
    {
      name: 'fkReferenceLetterId',
      foreignKeyConstraintName: 'fkReferenceLetterId',
      referencedColumnName: 'id',
    },
  ])
  fkReferenceLetterId: ReferenceLetter;

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
