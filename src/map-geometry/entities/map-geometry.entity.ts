import { House } from 'src/house/entities/house.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MapGeometry')
export class MapGeometry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @OneToMany(() => House, (house: House) => house.fkUserId)
  fkHouseId?: House[];
}
