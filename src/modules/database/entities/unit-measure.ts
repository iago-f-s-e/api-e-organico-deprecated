import { maxSize } from '@src/modules/common/constants';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { UnitMeasureProduct } from './unit-measure-product';

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

  @OneToMany(() => UnitMeasureProduct, unitMeasureProducts => unitMeasureProducts.unitMeasure)
  public readonly unitMeasureProducts!: UnitMeasureProduct[];
}
