import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/infra/database/entities';
import { UpdateProductRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [UpdateProductRepository],
  providers: [UpdateProductRepository]
})
export class UpdateProductModule {}
