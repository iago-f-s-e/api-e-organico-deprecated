import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Address } from './address';
import { BaseEntity } from './base-entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  public readonly id!: string;

  @Column({ type: 'varchar', unique: true, length: 11 })
  public readonly phone!: string;

  @Column({ type: 'varchar', unique: true, length: 11 })
  public readonly document!: string;

  @Column({ type: 'varchar' })
  public readonly name!: string;

  @Column({ type: 'varchar' })
  public readonly email!: string;

  @Column({ type: 'varchar' })
  public readonly password!: string;

  @OneToOne(() => Address, address => address.user, { cascade: true })
  public readonly address!: Address;
}
