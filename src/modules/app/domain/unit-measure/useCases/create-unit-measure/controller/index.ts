import { Body, Controller, Post } from '@nestjs/common';
import { UnitMeasure } from '@src/infra/database/entities';
import { UnitMeasureDTO } from '../../../dtos';
import { ValidateToCreateUnitMeasure } from '../entity';
import { CreateUnitMeasureService } from '../service';

@Controller()
export class CreateUnitMeasureController {
  constructor(private readonly createService: CreateUnitMeasureService) {}

  @Post()
  public async exec(@Body() body: UnitMeasureDTO): Promise<UnitMeasure> {
    const unitMeasure = new ValidateToCreateUnitMeasure(body);

    const createOrError = await this.createService.exec(unitMeasure.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
