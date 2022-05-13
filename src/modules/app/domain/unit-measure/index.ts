import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

import { createUnitMeasureChildren, CreateUnitMeasureModule } from './useCases/create-unit-measure';
import { findUnitMeasureChildren, FindUnitMeasureModule } from './useCases/find-unit-measure';

@Module({
  imports: [CreateUnitMeasureModule, FindUnitMeasureModule]
})
export class UnitMeasureModule {}

export const unitMeasureChildren: RouteTree = {
  path: '/unit-measure',
  module: UnitMeasureModule,
  children: [createUnitMeasureChildren, findUnitMeasureChildren]
};
