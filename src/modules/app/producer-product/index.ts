import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { ProducerProductController } from './controllers';
import * as UseCases from './useCases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers: [ProducerProductController],
  exports: useCases,
  providers: useCases
})
export class ProducerProductModule {}

export const producerProductChildren: RouteTree = {
  path: '/producer-product',
  module: ProducerProductModule
};
