import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { domainChildren, DomainModule } from './domain';

@Module({
  imports: [DomainModule]
})
export class AppModule {}

export const appPrefix: RouteTree = {
  path: '/app',
  module: AppModule,
  children: [domainChildren]
};
