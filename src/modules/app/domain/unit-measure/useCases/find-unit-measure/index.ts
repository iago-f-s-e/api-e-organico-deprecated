import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/infra/database/entities';
import { FindUnitMeasureController } from './controller';
import { FindUnitMeasureRepository } from './repository';
import { FindUnitMeasureService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMeasure])],
  exports: [FindUnitMeasureRepository],
  controllers: [FindUnitMeasureController],
  providers: [FindUnitMeasureRepository, FindUnitMeasureService]
})
export class FindUnitMeasureModule {}

export const findUnitMeasureChildren: RouteTree = {
  path: '/',
  module: FindUnitMeasureModule
};
