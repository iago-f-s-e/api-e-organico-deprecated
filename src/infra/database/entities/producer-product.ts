import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Producer } from './producer';
import { Product } from './product';
import { UnitMeasure } from './unit-measure';

@Entity('producer_product')
export class ProducerProduct {
  @PrimaryColumn({ type: 'uuid', name: 'producer_product_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'product_id' })
  public readonly productId!: string;

  @Column({ type: 'uuid', name: 'producer_id' })
  public readonly producerId!: string;

  @Column({ type: 'uuid', name: 'unit_measure_id' })
  public readonly unitMeasureId!: string;

  @Column({ type: 'float' })
  public readonly price!: number;

  @Column({ type: 'float' })
  public readonly stock!: number;

  @Column({ type: 'date', name: 'harvest_date' })
  public readonly harvestDate!: Date;

  @Index('IDX_producer_product_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @ManyToOne(() => UnitMeasure, unit => unit.producerProducts)
  @JoinColumn({ name: 'unit_measure_id', referencedColumnName: 'id' })
  public readonly unitMeasure!: UnitMeasure;

  @ManyToOne(() => Product, product => product.producerProducts)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  public readonly product!: Product;

  @ManyToOne(() => Producer, producer => producer.producerProducts)
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  public readonly producer!: Producer;
}
