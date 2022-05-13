import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindUnitMeasureRepository {
  constructor(@InjectRepository(UnitMeasure) private readonly reference: Repository<UnitMeasure>) {}

  public existing(name: string, abbreviation: string): Promise<UnitMeasure | null> {
    return this.reference.findOne({
      where: [{ name }, { abbreviation }],
      select: { id: true, isActive: true }
    });
  }
}
