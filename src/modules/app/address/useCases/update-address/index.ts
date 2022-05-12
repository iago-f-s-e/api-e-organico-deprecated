import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@src/modules/database/entities';
import { CreateAddressModule } from '../create-address';
import { UpdateAddressRepository } from './repository';
import { UpdateAddressService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CreateAddressModule],
  exports: [UpdateAddressService],
  providers: [UpdateAddressRepository, UpdateAddressService]
})
export class UpdateAddressModule {}
