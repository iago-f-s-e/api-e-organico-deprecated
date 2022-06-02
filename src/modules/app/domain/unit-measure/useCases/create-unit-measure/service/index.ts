import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { UnitMeasure } from '@src/infra/database/entities';
import { UpdateResult } from 'typeorm';
import { FindUnitMeasureRepository } from '../../find-unit-measure/repository';
import { UpdateUnitMeasureRepository } from '../../update-unit-measure/repository';
import { CreateUnitMeasureDTO } from '../dtos';
import { CreateUnitMeasureRepository } from '../repository';

@Injectable()
export class CreateUnitMeasureService {
  constructor(
    private readonly createUnitMeasure: CreateUnitMeasureRepository,
    private readonly findUnitMeasure: FindUnitMeasureRepository,
    private readonly updateUnitMeasure: UpdateUnitMeasureRepository
  ) {}

  private errorMessage(data: CreateUnitMeasureDTO): string {
    return `The unit measure "name: ${data.name}, abbreviation: ${data.abbreviation}" already exists`;
  }

  private insert(data: CreateUnitMeasureDTO): Promise<UnitMeasure> {
    return this.createUnitMeasure.exec(data);
  }

  private async reactive(id: string): Promise<UpdateResult> {
    return this.updateUnitMeasure.reactive(id);
  }

  public async exec(data: CreateUnitMeasureDTO): CreateResponse<UnitMeasure> {
    const found = await this.findUnitMeasure.existing(data.name, data.abbreviation);

    if (!found) return right(await this.insert(data));

    if (found.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.reactive(found.id);

    return right(found);
  }
}
