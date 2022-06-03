import { Injectable } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { Market } from '@src/infra/database/entities';
import { MarketRepository } from '@src/infra/database/repositories';
import { RedisService } from '@src/infra/redis/services';

@Injectable()
export class FindMarketUseCase {
  constructor(
    private readonly repository: MarketRepository,
    private readonly redisService: RedisService
  ) {}

  public async exec(): Promise<Market[]> {
    const cache = await this.redisService.get<Market[]>(keys.ALL_MARKETS);

    if (cache) return cache;

    const markets = await this.repository.findAll();

    this.redisService.set(keys.ALL_MARKETS, markets);

    return markets;
  }
}
