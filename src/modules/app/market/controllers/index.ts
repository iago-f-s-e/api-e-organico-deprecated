import { Controller, Get } from '@nestjs/common';
import { Market } from '@src/infra/database/entities';
import { FindMarketUseCase } from '../useCases';

@Controller()
export class MarketController {
  constructor(private readonly findUseCase: FindMarketUseCase) {}

  @Get()
  public getAll(): Promise<Market[]> {
    return this.findUseCase.exec();
  }
}
