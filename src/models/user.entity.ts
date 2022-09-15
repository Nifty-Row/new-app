import { Role } from 'src/interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  walletAddress: string;

  @Column({ default: 'collector' })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  about: string;

  @Column()
  joinDate: Date;

  @Column({ nullable: true })
  webUrl: string;

  @Column()
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
