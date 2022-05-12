import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Product } from './product';
import { UnitMeasure } from './unit-measure';

@Entity('unit_measure_product')
export class UnitMeasureProduct extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'unit_measure_id' })
  public readonly unitMeasureId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'product_id' })
  public readonly productId!: string;

  @ManyToOne(() => UnitMeasure, unitMeasure => unitMeasure.unitMeasureProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'unit_measure_id', referencedColumnName: 'id' })
  public readonly unitMeasure!: UnitMeasure;

  @ManyToOne(() => Product, product => product.unitMeasureProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  public readonly product!: Product;
}
