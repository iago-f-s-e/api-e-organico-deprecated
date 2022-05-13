import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/modules/database/entities';
import { FindProductRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [FindProductRepository],
  providers: [FindProductRepository]
})
export class FindProductModule {}
