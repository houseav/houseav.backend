import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';

@Entity('House')
export class House {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  zipcode: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  streetNumber: number;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  furnished?: boolean;

  @Column({ nullable: true })
  parking?: boolean;

  @Column({ nullable: true })
  type?: string; //villa, appartamento..

  @Column({ nullable: true })
  wifi: boolean;

  @Column({
    nullable: true,
    default:
      'https://cdn.dribbble.com/users/434375/screenshots/1985876/media/ca9be61d8f34781084946180b857f893.jpg',
  })
  imageUrls: string;

  @Column({ nullable: true })
  availability: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  availabilityDateStart: Date;

  @Column({ nullable: true })
  availabilityDateEnd?: Date;

  @Column({ nullable: true })
  sleepPlace: number;

  @Column({ nullable: true })
  allergy: string;

  @Column({ nullable: true })
  animali: string;

  @Column({ nullable: true })
  requestRoommateType: string; // coppie; famiglie; bambini

  @Column({ nullable: true })
  transportation: string; // if neet autotransportation: auto; atm

  @Column({ nullable: true })
  zone: string; // zona

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

  @ManyToOne(() => User, (user) => user.fkHouseId, {
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

  @OneToOne(() => MapGeometry, (map) => map.fkHouseId, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'fkMapId',
      foreignKeyConstraintName: 'fkMapId',
      referencedColumnName: 'id',
    },
  ])
  fkMapId: MapGeometry;

  @OneToOne(
    () => QueueHouseRegistration,
    (QueueHouseRegistration) => QueueHouseRegistration.fkHouseId,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn([
    {
      name: 'fkQueueHouseRegistrationId',
      foreignKeyConstraintName: 'fkQueueHouseRegistrationId',
      referencedColumnName: 'id',
    },
  ])
  fkQueueHouseRegistrationId: QueueHouseRegistration;
}
