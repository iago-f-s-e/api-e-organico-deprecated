import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { ProducerProductModule } from '../producer-product';

import * as Controllers from './controllers';
import * as UseCases from './useCases';

const controllers = Object.values(Controllers);
const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule, ProducerProductModule],
  controllers: controllers,
  providers: useCases
})
export class ProducerModule {}

export const producerChildren: RouteTree = {
  path: '/producer',
  module: ProducerModule
};
