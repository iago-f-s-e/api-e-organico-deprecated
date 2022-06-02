import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@src/infra/database/entities';
import { Repository } from 'typeorm';
import { CreateProductDTO } from '../dtos';

@Injectable()
export class CreateProductRepository {
  constructor(@InjectRepository(Product) private readonly user: Repository<Product>) {}

  public exec(data: CreateProductDTO): Promise<Product> {
    return this.user.save(this.user.create(data));
  }
}
