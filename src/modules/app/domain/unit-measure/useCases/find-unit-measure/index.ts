import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/modules/database/entities';
import { FindUnitMeasureRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMeasure])],
  exports: [FindUnitMeasureRepository],
  providers: [FindUnitMeasureRepository]
})
export class FindUnitMeasureModule {}
