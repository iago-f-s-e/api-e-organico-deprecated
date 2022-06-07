import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findOptions } from '@src/domain/constants';
import { Repository } from 'typeorm';
import { Market } from '../entities';

@Injectable()
export class MarketRepository {
  constructor(@InjectRepository(Market) private readonly market: Repository<Market>) {}

  public async findAll(): Promise<Market[]> {
    return this.market.find(findOptions.market.FIND_ALL);
  }
}
