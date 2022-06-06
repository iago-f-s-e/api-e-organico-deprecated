import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { domainChildren, DomainModule } from './domain';
import { marketChildren, MarketModule } from './market';
import { producerProductChildren, ProducerProductModule } from './producer-product';
import { productChildren, ProductModule } from './product';
import { unitMeasureChildren, UnitMeasureModule } from './unit-measure';

@Module({
  imports: [DomainModule, ProducerProductModule, MarketModule, ProductModule, UnitMeasureModule]
})
export class AppModule {}

export const appPrefix: RouteTree = {
  path: '/app',
  module: AppModule,
  children: [
    domainChildren,
    producerProductChildren,
    marketChildren,
    productChildren,
    unitMeasureChildren
  ]
};
