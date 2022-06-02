import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/infra/database/entities';
import { Repository } from 'typeorm';
import { CreateUnitMeasureDTO } from '../dtos';

@Injectable()
export class CreateUnitMeasureRepository {
  constructor(@InjectRepository(UnitMeasure) private readonly user: Repository<UnitMeasure>) {}

  public exec(data: CreateUnitMeasureDTO): Promise<UnitMeasure> {
    return this.user.save(this.user.create(data));
  }
}
