import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetMarket, MinimalMarketToClient } from '@src/domain/dtos/market';
import { minimalMarketToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindMarketUseCase } from '../useCases';

@Controller()
export class MarketController {
  constructor(
    private readonly findUseCase: FindMarketUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get()
  public async getAll(): GetMarket {
    const cache = await this.redisService.get<MinimalMarketToClient[]>(keys.ALL_MARKETS);

    if (cache) return cache;

    const markets = (await this.findUseCase.exec()).map(market => minimalMarketToClient(market));

    this.redisService.set(keys.ALL_MARKETS, markets);

    return markets;
  }
}
