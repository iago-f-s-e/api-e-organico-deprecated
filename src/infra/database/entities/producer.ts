import { CertificationType, ProducerStatus } from '@src/modules/common/types';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ProducerProduct } from './producer-product';
import { Property } from './property';
import { User } from './user';

@Entity('producer')
export class Producer {
  @PrimaryColumn({ type: 'uuid', name: 'producer_id' })
  public readonly id!: string;

  @Column({ type: 'boolean', name: 'make_delivery', default: false })
  public readonly makeDelivery!: boolean;

  @Column({ type: 'varchar', default: 'PENDING' })
  public readonly status!: ProducerStatus;

  @Column({ type: 'varchar', name: 'certification_type', default: 'IN CONVERSION' })
  public readonly certificationType!: CertificationType;

  @OneToOne(() => User, user => user.producer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'producer_id', referencedColumnName: 'id' })
  public readonly user!: User;

  @OneToMany(() => ProducerProduct, producerProducts => producerProducts.producer)
  public readonly producerProducts!: ProducerProduct[];

  @OneToMany(() => Property, properties => properties.producer)
  public readonly properties!: Property[];
}
