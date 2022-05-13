import { Controller, Get } from '@nestjs/common';
import { GetUnitMeasure } from '../../../types';
import { FindUnitMeasureService } from '../service';

@Controller()
export class FindUnitMeasureController {
  constructor(private readonly findService: FindUnitMeasureService) {}

  @Get()
  public async exec(): GetUnitMeasure {
    return this.findService.exec();
  }
}
