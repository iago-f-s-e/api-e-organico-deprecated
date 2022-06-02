import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@src/infra/database/entities';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UpdateProductRepository {
  constructor(@InjectRepository(Product) private readonly reference: Repository<Product>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: false });
  }
}
