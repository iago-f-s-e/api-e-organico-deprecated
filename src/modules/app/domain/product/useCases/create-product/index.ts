import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/modules/database/entities';
import { FindProductModule } from '../find-product';
import { UpdateProductModule } from '../update-product';
import { CreateProductController } from './controller';
import { CreateProductRepository } from './repository';
import { CreateProductService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FindProductModule, UpdateProductModule],
  controllers: [CreateProductController],
  providers: [CreateProductRepository, CreateProductService]
})
export class CreateProductModule {}

export const createProductChildren: RouteTree = {
  path: '/',
  module: CreateProductModule
};
