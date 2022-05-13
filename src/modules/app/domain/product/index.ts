import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

import { createProductChildren, CreateProductModule } from './useCases/create-product';

@Module({
  imports: [CreateProductModule]
})
export class ProductModule {}

export const productChildren: RouteTree = {
  path: '/product',
  module: ProductModule,
  children: [createProductChildren]
};
