import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindUnitMeasureRepository {
  constructor(
    @InjectRepository(UnitMeasure) private readonly unitMeasure: Repository<UnitMeasure>
  ) {}

  public existing(name: string, abbreviation: string): Promise<UnitMeasure | null> {
    return this.unitMeasure.findOne({
      where: [{ name }, { abbreviation }],
      select: { id: true, isActive: true }
    });
  }

  public exec(): Promise<UnitMeasure[]> {
    return this.unitMeasure
      .createQueryBuilder('unitMeasure')
      .where('unitMeasure.isActive = true')
      .getMany();
  }
}
