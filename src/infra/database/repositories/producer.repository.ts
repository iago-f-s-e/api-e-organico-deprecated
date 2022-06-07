import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findOptions } from '@src/domain/constants';
import { Repository } from 'typeorm';
import { Producer } from '../entities';

@Injectable()
export class ProducerRepository {
  constructor(@InjectRepository(Producer) private readonly producer: Repository<Producer>) {}

  public findAll(): Promise<Producer[]> {
    return this.producer.find(findOptions.producer.FIND_ALL);
  }

  public findById(id: string): Promise<Producer[]> {
    return this.producer.find({
      where: {
        id,
        status: 'ACTIVE',
        user: {
          isActive: true
        },
        producerMarkets: {
          isActive: true,
          market: {
            workdays: {
              isActive: true
            }
          }
        },
        producerProducts: {
          isActive: true
        }
      },
      select: {
        id: true,
        user: {
          name: true,
          address: {
            id: true,
            city: true,
            complement: true,
            district: true,
            number: true,
            state: true,
            street: true,
            zipCode: true
          },
          score: {
            rating: true,
            transactions: true
          }
        },
        producerMarkets: {
          isActive: true,
          market: {
            id: true,
            name: true,
            score: {
              transactions: true
            },
            workdays: {
              id: true,
              weekday: true,
              opening: true,
              closing: true
            },
            address: {
              id: true,
              city: true,
              complement: true,
              district: true,
              number: true,
              state: true,
              street: true,
              zipCode: true
            }
          }
        },
        producerProducts: {
          id: true,
          price: true,
          product: {
            name: true
          },
          unitMeasure: {
            name: true
          }
        }
      },
      relations: {
        user: {
          score: true,
          address: true
        },
        producerMarkets: {
          market: {
            address: true,
            score: true,
            workdays: true
          }
        },
        producerProducts: {
          product: true,
          unitMeasure: true
        }
      }
    });
  }
}
