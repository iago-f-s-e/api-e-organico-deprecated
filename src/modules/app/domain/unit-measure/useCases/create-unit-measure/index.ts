import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasure } from '@src/infra/database/entities';
import { FindUnitMeasureModule } from '../find-unit-measure';
import { UpdateUnitMeasureModule } from '../update-unit-measure';
import { CreateUnitMeasureController } from './controller';
import { CreateUnitMeasureRepository } from './repository';
import { CreateUnitMeasureService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitMeasure]),
    FindUnitMeasureModule,
    UpdateUnitMeasureModule
  ],
  controllers: [CreateUnitMeasureController],
  providers: [CreateUnitMeasureRepository, CreateUnitMeasureService]
})
export class CreateUnitMeasureModule {}

export const createUnitMeasureChildren: RouteTree = {
  path: '/',
  module: CreateUnitMeasureModule
};
