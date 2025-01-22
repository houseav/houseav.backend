import { House } from 'src/house/entities/house.entity';
import { GeometryObject } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';

@Entity('MapGeometry')
export class MapGeometry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @OneToOne(() => House, (house) => house.fkMapId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'fkHouseId',
      foreignKeyConstraintName: 'fkHouseId',
      referencedColumnName: 'id',
    },
  ])
  fkHouseId?: House;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Geometry', // or 'Point', 'MultiLineString', etc.
    srid: 4326, // Set the SRID for your spatial data
  })
  geometry: Relation<GeometryObject>; // This will store the geometry as GeoJSON-compatible

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date | null;
}
