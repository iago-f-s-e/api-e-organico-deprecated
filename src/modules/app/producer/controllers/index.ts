import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { GetProducer, MinimalProducerToClient } from '@src/domain/dtos/producer';
import { minimalProducerToClient } from '@src/domain/toClient';
import { RedisService } from '@src/infra/redis/services';
import { FindProducerUseCase } from '../useCases';

@Controller()
export class ProducerController {
  constructor(
    private readonly findUseCase: FindProducerUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get()
  public async findAllProducers(): GetProducer {
    const cache = await this.redisService.get<MinimalProducerToClient[]>(keys.ALL_PRODUCERS);

    if (cache) return cache;

    const producers = (await this.findUseCase.exec()).map(producer =>
      minimalProducerToClient(producer)
    );

    this.redisService.set(keys.ALL_PRODUCERS, producers);

    return producers;
  }
}
