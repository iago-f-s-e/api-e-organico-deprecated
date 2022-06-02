import { maxSize } from '@src/domain/constants';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { ProducerProduct } from './producer-product';

@Index('IDX_unit_measure_abbreviation_name', ['name', 'abbreviation'], { unique: true })
@Entity('unit_measure')
export class UnitMeasure extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'unit_measure_id' })
  public readonly id!: string;

  @Index('IDX_unit_measure_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.UNIT_MEASURE_NAME, unique: true })
  public readonly name!: string;

  @Index('IDX_unit_measure_abbreviation', { unique: true })
  @Column({ type: 'varchar', length: maxSize.UNIT_MEASURE_ABBREVIATION, unique: true })
  public readonly abbreviation!: string;

  @Index('IDX_unit_measure_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @OneToMany(() => ProducerProduct, products => products.unitMeasure, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public readonly producerProducts!: ProducerProduct[];
}
