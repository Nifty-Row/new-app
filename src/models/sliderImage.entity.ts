import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SliderImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstSlide: string;

  @Column({ nullable: true })
  secondSlide: string;

  @Column({ nullable: true })
  thirdSlide: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
