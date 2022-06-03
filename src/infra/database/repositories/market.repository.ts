import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from '../entities';

@Injectable()
export class MarketRepository {
  constructor(@InjectRepository(Market) private readonly market: Repository<Market>) {}

  public async findAll(): Promise<Market[]> {
    return this.market.find({
      where: { isActive: true },
      order: {
        name: 'ASC'
      },
      select: {
        id: true,
        name: true,
        address: {
          id: true,
          state: true,
          city: true,
          district: true,
          street: true,
          complement: true,
          number: true,
          zipCode: true
        },
        workdays: {
          id: true,
          weekday: true,
          opening: true,
          closing: true
        }
      },
      relations: {
        address: true,
        workdays: true
      }
    });
  }
}
