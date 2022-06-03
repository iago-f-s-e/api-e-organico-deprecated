import { Injectable } from '@nestjs/common';
import { Product } from '@src/infra/database/entities';
import { ProductRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  public exec(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
