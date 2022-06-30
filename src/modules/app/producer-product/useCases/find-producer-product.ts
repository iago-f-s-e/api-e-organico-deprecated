import { Injectable, NotFoundException } from '@nestjs/common';
import { ProducerProduct } from '@src/infra/database/entities';
import { ProducerProductRepository } from '@src/infra/database/repositories';
import { left, right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindProducerProductUseCase {
  constructor(private readonly repository: ProducerProductRepository) {}

  public async findById(id: string): FindResponse<ProducerProduct> {
    const [product] = await this.repository.findById(id);

    if (!product) return left(new NotFoundException('Product not found'));

    return right(product);
  }

  public findByProducerId(id: string): Promise<ProducerProduct[]> {
    return this.repository.findByProducerId(id);
  }
}
