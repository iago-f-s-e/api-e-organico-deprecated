import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@src/infra/database/entities';
import { CreateAddressRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [CreateAddressRepository],
  providers: [CreateAddressRepository]
})
export class CreateAddressModule {}
