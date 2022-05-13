import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { productChildren, ProductModule } from './product';
import { unitMeasureChildren, UnitMeasureModule } from './unit-measure';

@Module({
  imports: [ProductModule, UnitMeasureModule]
})
export class DomainModule {}

export const domainChildren: RouteTree = {
  path: '/',
  module: DomainModule,
  children: [productChildren, unitMeasureChildren]
};
