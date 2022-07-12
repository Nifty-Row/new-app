import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  subject: string;

  @Column()
  message: string;
}

@Entity()
export class Newsletter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
