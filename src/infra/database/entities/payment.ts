import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Transaction } from './transaction';

@Entity('payment')
export class Payment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'payment_id' })
  public readonly id!: string;

  @Index('IDX_payment_name', { unique: true })
  @Column({ type: 'varchar', unique: true })
  public readonly name!: string;

  @OneToMany(() => Transaction, transactions => transactions.payment)
  public readonly transactions!: Transaction[];
}
