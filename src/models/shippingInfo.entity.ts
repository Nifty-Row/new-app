import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @Column()
  phoneNumber: number;

  @Column()
  userWalletAddress: string;
}
