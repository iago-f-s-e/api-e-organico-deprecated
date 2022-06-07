import { Controller, Get, Param } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetMarket, MinimalMarketToClient } from '@src/domain/dtos/market';
import { marketToClient, minimalMarketToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindMarketUseCase } from '../useCases';

@Controller()
export class MarketController {
  constructor(
    private readonly findUseCase: FindMarketUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get(':id')
  public async getById(@Param('id') id: string): GetMarket {
    const market = await this.findUseCase.findById(id);

    if (market.isLeft()) throw market.value;

    return marketToClient(market.value);
  }

  @Get()
  public async getAll(): GetMarket {
    const cache = await this.redisService.get<MinimalMarketToClient[]>(keys.ALL_MARKETS);

    if (cache) return cache;

    const markets = (await this.findUseCase.exec()).map(market => minimalMarketToClient(market));

    this.redisService.set(keys.ALL_MARKETS, markets);

    return markets;
  }
}
