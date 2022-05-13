import { Injectable } from '@nestjs/common';

import { UnitMeasureToClientDTO } from '../../../dtos';
import { unitMeasureToClient } from '../../../helpers';
import { FindUnitMeasureRepository } from '../repository';

@Injectable()
export class FindUnitMeasureService {
  constructor(private readonly findUnitMeasure: FindUnitMeasureRepository) {}

  public async exec(): Promise<UnitMeasureToClientDTO[]> {
    return (await this.findUnitMeasure.exec()).map(unitMeasure => unitMeasureToClient(unitMeasure));
  }
}
