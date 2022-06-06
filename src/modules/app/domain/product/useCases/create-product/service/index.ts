import { ConflictException, Injectable } from '@nestjs/common';
import { Product } from '@src/infra/database/entities';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';
import { UpdateResult } from 'typeorm';
import { FindProductRepository } from '../../find-product/repository';
import { UpdateProductRepository } from '../../update-product/repository';
import { CreateProductDTO } from '../dtos';
import { CreateProductRepository } from '../repository';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly createProduct: CreateProductRepository,
    private readonly findProduct: FindProductRepository,
    private readonly updateProduct: UpdateProductRepository
  ) {}

  private errorMessage(data: CreateProductDTO): string {
    return `The aliment "name: ${data.name}" already exists`;
  }

  private insert(data: CreateProductDTO): Promise<Product> {
    return this.createProduct.exec(data);
  }

  private async reactive(id: string): Promise<UpdateResult> {
    return this.updateProduct.reactive(id);
  }

  public async exec(data: CreateProductDTO): CreateResponse<Product> {
    const found = await this.findProduct.existing(data.name);

    if (!found) return right(await this.insert(data));

    if (found.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(found.id);

    return right(found);
  }
}
