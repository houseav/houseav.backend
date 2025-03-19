import { Policy } from 'src/policy/entities/policy.entity';
import { QueueRegister } from '../../queue-user-registration/entities/queue-register.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('Reference-Letter')
export class ReferenceLetter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  namePastorLeader: string;

  @Column({ nullable: false })
  surnamePastorLeader: string;

  @Column({ nullable: true })
  numberPastorLeader: string;

  @Column({ nullable: false })
  timeInChurch: Date;

  @Column({ nullable: true })
  dateBaptism: Date;

  @Column({ nullable: true })
  nameGuardian: string;

  @Column({ nullable: true })
  numberGuardian: string;

  @Column({ nullable: true })
  numberChurch: string;

  @Column({ nullable: true })
  referenceDetails: string;

  @Column({ nullable: false, default: true })
  acceptDecline: boolean;

  @OneToOne(
    () => QueueRegister,
    (queueRegister) => queueRegister.fkReferenceLetterId,
    {
      cascade: true,
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn([
    {
      name: 'fkQueueRegisterId',
      foreignKeyConstraintName: 'fkQueueRegisterId',
      referencedColumnName: 'id',
    },
  ])
  fkQueueRegisterId?: QueueRegister;

  @ManyToOne(() => Policy, (policy) => policy.fkReferenceLetterId, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'fkPolicyId',
      foreignKeyConstraintName: 'fkPolicyId',
      referencedColumnName: 'id',
    },
  ])
  fkPolicyId: Policy;

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
