import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@src/infra/database/entities';
import { Repository } from 'typeorm';
import { UpdateAddressDTO } from '../../update-address/dtos';

@Injectable()
export class CreateAddressRepository {
  constructor(@InjectRepository(Address) private readonly address: Repository<Address>) {}

  public exec(data: Omit<UpdateAddressDTO, 'id'>): Promise<Address> {
    return this.address.save(this.address.create(data));
  }
}
