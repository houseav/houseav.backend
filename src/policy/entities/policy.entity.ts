import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('Policy')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  labelPolicy: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  datePolicy?: Date;

  @OneToMany(
    () => ReferenceLetter,
    (referenceLetter: ReferenceLetter) => referenceLetter.fkPolicyId,
  )
  fkReferenceLetterId?: ReferenceLetter[];

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
