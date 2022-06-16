import { Controller, Get } from '@nestjs/common';
import { keys } from '@src/domain/constants';
import { Payment } from '@src/infra/database/entities';
import { RedisService } from '@src/infra/redis/services';
import { FindPaymentUseCase } from '../useCases';

@Controller()
export class PaymentController {
  constructor(
    private readonly findUseCase: FindPaymentUseCase,
    private readonly redisService: RedisService
  ) {}

  @Get()
  public async getAll(): Promise<Payment[]> {
    const cache = await this.redisService.get<Payment[]>(keys.ALL_PAYMENTS);

    if (cache) return cache;

    const payments = await this.findUseCase.exec();

    this.redisService.set(keys.ALL_PAYMENTS, payments);

    return payments;
  }
}
