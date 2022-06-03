import { Injectable } from '@nestjs/common';
import { Market } from '@src/infra/database/entities';
import { MarketRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindMarketUseCase {
  constructor(private readonly repository: MarketRepository) {}

  public exec(): Promise<Market[]> {
    return this.repository.findAll();
  }
}
