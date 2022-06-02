import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/infra/database/entities';
import { UpdateUnitMeasureRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMeasure])],
  exports: [UpdateUnitMeasureRepository],
  providers: [UpdateUnitMeasureRepository]
})
export class UpdateUnitMeasureModule {}
