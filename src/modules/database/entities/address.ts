import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'address_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true, update: false })
  public readonly userId!: string;

  @Column({ type: 'varchar' })
  public readonly street!: string;

  @Column({ type: 'varchar' })
  public readonly number!: string;

  @Column({ type: 'varchar', name: 'zip_code' })
  public readonly zipCode!: string;

  @Column({ type: 'varchar' })
  public readonly district!: string;

  @Column({ type: 'varchar' })
  public readonly city!: string;

  @Column({ type: 'varchar' })
  public readonly state!: string;

  @Column({ type: 'varchar' })
  public readonly complement!: string;

  @OneToOne(() => User, user => user.address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;
}
