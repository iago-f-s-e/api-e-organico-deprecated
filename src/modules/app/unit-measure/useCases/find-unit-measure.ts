import { Injectable } from '@nestjs/common';
import { UnitMeasure } from '@src/infra/database/entities';
import { UnitMeasureRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindUnitMeasureUseCase {
  constructor(private readonly repository: UnitMeasureRepository) {}

  public exec(): Promise<UnitMeasure[]> {
    return this.repository.findAll();
  }
}
