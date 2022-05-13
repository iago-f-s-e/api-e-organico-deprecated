import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { unitMeasureChildren, UnitMeasureModule } from './unit-measure';

@Module({
  imports: [UnitMeasureModule]
})
export class DomainModule {}

export const domainChildren: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [unitMeasureChildren]
};
