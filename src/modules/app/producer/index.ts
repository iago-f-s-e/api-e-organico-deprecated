import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { InfraModule } from '@src/infra';
import { ProducerController } from './controllers';

import * as UseCases from './useCases';

const useCases = Object.values(UseCases);

@Module({
  imports: [InfraModule],
  controllers: [ProducerController],
  providers: useCases
})
export class ProducerModule {}

export const producerChildren: RouteTree = {
  path: '/producer',
  module: ProducerModule
};
