import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';
import { maxSize } from '@src/domain/constants';
import { myTransformer } from '../helpers';
import { Market } from './market';
import { Property } from './property';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'address_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'user_id', nullable: true, update: false, select: false })
  public readonly userId!: string;

  @Index('IDX_market_address', { unique: true })
  @Column({ type: 'uuid', name: 'market_id', nullable: true, update: false, select: false })
  public readonly marketId!: string;

  @Index('IDX_property_address', { unique: true })
  @Column({ type: 'uuid', name: 'property_id', nullable: true, update: false, select: false })
  public readonly propertyId!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_STATE })
  public readonly state!: string;

  @Column({ type: 'varchar', length: maxSize.ADDRESS_CITY })
  public readonly city!: string;

  @Column({
    type: 'varchar',
    length: maxSize.ADDRESS_DISTRICT + maxSize.TRANSFORMER,
    transformer: myTransformer
  })
  public readonly district!: string;

  @Column({
    type: 'varchar',
    length: maxSize.ADDRESS_STREET + maxSize.TRANSFORMER,
    transformer: myTransformer
  })
  public readonly street!: string;

  @Column({
    type: 'varchar',
    name: 'zip_code',
    length: maxSize.ADDRESS_ZIP_CODE + maxSize.TRANSFORMER,
    transformer: myTransformer
  })
  public readonly zipCode!: string;

  @Column({
    type: 'varchar',
    length: maxSize.ADDRESS_COMPLEMENT + maxSize.TRANSFORMER,
    transformer: myTransformer,
    nullable: true
  })
  public readonly complement?: string;

  @Column({ type: 'int', nullable: true })
  public readonly number?: number;

  @ManyToOne(() => User, user => user.address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @OneToOne(() => Market, market => market.address, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  public readonly market!: Market;

  @OneToOne(() => Property, property => property.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
  public readonly property!: Property;
}
