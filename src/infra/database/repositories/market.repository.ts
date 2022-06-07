import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findOptions } from '@src/domain/constants';
import { Repository } from 'typeorm';
import { Market } from '../entities';

@Injectable()
export class MarketRepository {
  constructor(@InjectRepository(Market) private readonly market: Repository<Market>) {}

  public findAll(): Promise<Market[]> {
    return this.market.find(findOptions.market.FIND_ALL);
  }

  public findById(id: string): Promise<Market[]> {
    return this.market.find({
      where: {
        id,
        isActive: true,
        producerMarkets: {
          producer: {
            user: {
              isActive: true
            }
          }
        },
        workdays: {
          isActive: true
        }
      },
      select: {
        id: true,
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
        producerMarkets: {
          isActive: true,
          producer: {
            id: true,
            user: {
              name: true,
              score: {
                rating: true,
                transactions: true
              }
            }
          }
        },
        score: {
          transactions: true
        },
        workdays: {
          id: true,
          weekday: true,
          closing: true,
          opening: true
        }
      },
      relations: {
        address: true,
        producerMarkets: {
          producer: {
            user: {
              score: true
            }
          }
        },
        score: true,
        workdays: true
      }
    });
  }
}
