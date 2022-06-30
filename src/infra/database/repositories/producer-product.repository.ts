import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProducerProductDTO } from '@src/domain/dtos/producer-product';
import { Repository } from 'typeorm';
import { ProducerProduct } from '../entities';

@Injectable()
export class ProducerProductRepository {
  constructor(
    @InjectRepository(ProducerProduct) private readonly producerProduct: Repository<ProducerProduct>
  ) {}

  public insert(data: CreateProducerProductDTO): Promise<ProducerProduct> {
    return this.producerProduct.save(this.producerProduct.create(data));
  }

  public findByProducerId(producerId: string): Promise<ProducerProduct[]> {
    return this.producerProduct.find({
      where: { producerId, isActive: true },
      select: {
        id: true,
        price: true,
        stock: true,
        score: {
          transactions: true
        },
        product: {
          name: true
        }
      },
      relations: {
        product: true,
        score: true,
        unitMeasure: true
      }
    });
  }

  public findById(id: string): Promise<ProducerProduct[]> {
    return this.producerProduct.find({
      where: {
        id,
        isActive: true
      },
      select: {
        id: true,
        harvestDate: true,
        price: true,
        stock: true,
        score: {
          transactions: true
        },
        product: {
          name: true
        }
      },
      relations: {
        product: true,
        score: true,
        unitMeasure: true
      }
    });
  }
}
