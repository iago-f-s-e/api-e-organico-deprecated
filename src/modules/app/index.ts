import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { domainChildren, DomainModule } from './domain';
import { marketChildren, MarketModule } from './market';
import { paymentChildren, PaymentModule } from './payment';
import { producerChildren, ProducerModule } from './producer';
import { producerProductChildren, ProducerProductModule } from './producer-product';
import { productChildren, ProductModule } from './product';
import { transactionChildren, TransactionModule } from './transaction';
import { unitMeasureChildren, UnitMeasureModule } from './unit-measure';

@Module({
  imports: [
    DomainModule,
    ProducerProductModule,
    MarketModule,
    ProductModule,
    UnitMeasureModule,
    ProducerModule,
    TransactionModule,
    PaymentModule
  ]
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
    unitMeasureChildren,
    producerChildren,
    transactionChildren,
    paymentChildren
  ]
};
