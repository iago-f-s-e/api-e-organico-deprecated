import { Injectable, NotFoundException } from '@nestjs/common';
import { Market } from '@src/infra/database/entities';
import { MarketRepository } from '@src/infra/database/repositories';
import { left, right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindMarketUseCase {
  constructor(private readonly repository: MarketRepository) {}

  public async findById(id: string): FindResponse<Market> {
    const [market] = await this.repository.findById(id);

    if (!market) return left(new NotFoundException('Market not found'));

    return right(market);
  }

  public exec(): Promise<Market[]> {
    return this.repository.findAll();
  }
}
