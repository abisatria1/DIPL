import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Campaigner {
  @PrimaryGeneratedColumn()
  id_participant: number;

  @Column({ length: 25 })
  nama_campaigner: string;

  @Column({ length: 25 })
  notelp_campaigner: string;

  @Column()
  maks_kuota_campaigner: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
