import { BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

export class BaseEntity {
  public id!: string;

  @BeforeInsert()
  protected setId(): void {
    this.id = randomUUID();
  }
}
