import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProducerProductDTO } from '@src/domain/dtos/producer-product/create-producer-product.dto';
import { Repository } from 'typeorm';
import { ProducerProduct } from '../entities';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(ProducerProduct) private readonly producerProduct: Repository<ProducerProduct>
  ) {}

  public insert(data: CreateProducerProductDTO): Promise<ProducerProduct> {
    return this.producerProduct.save(this.producerProduct.create(data));
  }
}
