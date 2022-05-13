import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

import { createUnitMeasureChildren, CreateUnitMeasureModule } from './useCases/create-unit-measure';

@Module({
  imports: [CreateUnitMeasureModule]
})
export class UnitMeasureModule {}

export const unitMeasureChildren: RouteTree = {
  path: '/unit-measure',
  module: UnitMeasureModule,
  children: [createUnitMeasureChildren]
};
