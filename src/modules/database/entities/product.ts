import { maxSize } from '@src/modules/common/constants';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { UnitMeasureProduct } from './unit-measure-product';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'product_id' })
  public readonly id!: string;

  @Index('IDX_product_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.PRODUCT_NAME, unique: true })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.PRODUCT_TYPE })
  public readonly type!: string;

  @Index('IDX_product_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true })
  public readonly isActive!: boolean;

  @OneToMany(() => UnitMeasureProduct, unitMeasureProducts => unitMeasureProducts.product, {
    cascade: true
  })
  public readonly unitMeasureProducts!: UnitMeasureProduct[];
}
