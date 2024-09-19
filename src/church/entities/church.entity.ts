import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Church')
export class Church {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @OneToMany(() => User, (user: User) => user.fkChurchId)
  fkUserId?: User[];
}
