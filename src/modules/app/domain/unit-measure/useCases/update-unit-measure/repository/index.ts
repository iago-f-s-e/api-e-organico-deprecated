import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UpdateUnitMeasureRepository {
  constructor(@InjectRepository(UnitMeasure) private readonly reference: Repository<UnitMeasure>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.reference.update({ id }, { isActive: false });
  }
}
