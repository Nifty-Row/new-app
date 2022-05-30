import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegramUrl: string;

  @Column()
  facebookUrl: string;

  @Column()
  twitterUrl: string;

  @Column()
  youtubeUrl: string;

  @Column()
  pinterestUrl: string;

  @Column()
  discordUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
