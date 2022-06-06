import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetUnitMeasure, UnitMeasureToClient } from '@src/domain/dtos/unit-measure';
import { unitMeasureToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindUnitMeasureUseCase } from '../useCases';

@Controller()
export class UnitMeasureController {
  constructor(
    private readonly findUseCase: FindUnitMeasureUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get()
  public async getAll(): GetUnitMeasure {
    const cache = await this.redisService.get<UnitMeasureToClient[]>(keys.ALL_PRODUCTS);

    if (cache) return cache;

    const unitMeasures = (await this.findUseCase.exec()).map(unitMeasure =>
      unitMeasureToClient(unitMeasure)
    );

    this.redisService.set(keys.ALL_PRODUCTS, unitMeasures);

    return unitMeasures;
  }
}
