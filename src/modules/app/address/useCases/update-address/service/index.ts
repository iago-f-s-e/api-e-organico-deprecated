import { Injectable } from '@nestjs/common';
import { Address } from '@src/infra/database/entities';
import { UpdateResult } from 'typeorm';
import { CreateAddressRepository } from '../../create-address/repository';
import { UpdateAddressDTO } from '../dtos';
import { UpdateAddressRepository } from '../repository';

@Injectable()
export class UpdateAddressService {
  constructor(
    private readonly createAddress: CreateAddressRepository,
    private readonly updateAddress: UpdateAddressRepository
  ) {}

  private insert(data: UpdateAddressDTO): Promise<Address> {
    const { id: _omit, ...address } = data;

    return this.createAddress.exec(address);
  }

  private update(data: UpdateAddressDTO): Promise<UpdateResult> {
    const { userId: _omit, ...address } = data;

    return this.updateAddress.exec(address);
  }

  public exec(data: UpdateAddressDTO): Promise<Address | UpdateResult> {
    if (!data.id) return this.insert(data);

    return this.update(data);
  }
}
