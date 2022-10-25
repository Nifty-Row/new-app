import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BankInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column({ nullable: true })
  bankAddress?: string;

  @Column()
  accountName: string;

  @Column()
  bankAccountNumber: number;

  @Column()
  bankSortCode: string;

  @Column({ nullable: true })
  IBANNumber?: string;

  @Column()
  accountHolderAddress: string;

  @Column()
  userWalletAddress: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
