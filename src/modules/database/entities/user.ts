import { Column, Entity, PrimaryColumn } from 'typeorm';
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
}
