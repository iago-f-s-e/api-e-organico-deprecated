import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetMarket, MarketToClient } from '@src/domain/dtos/market';
import { marketToClient } from '@src/domain/toClient';
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
    const cache = await this.redisService.get<MarketToClient[]>(keys.ALL_MARKETS);

    if (cache) return cache;

    const markets = (await this.findUseCase.exec()).map(market => marketToClient(market));

    this.redisService.set(keys.ALL_MARKETS, markets);

    return markets;
  }
}
