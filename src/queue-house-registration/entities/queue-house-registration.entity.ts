import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { House } from 'src/house/entities/house.entity';

@Entity('Queue-House-Register')
export class QueueHouseRegistration {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, default: false })
  verified: boolean;

  @OneToOne(() => House, (House) => House.fkQueueHouseRegistrationId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'fkHouseId',
      foreignKeyConstraintName: 'fkHouseId',
      referencedColumnName: 'id',
    },
  ])
  fkHouseId: House;

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
