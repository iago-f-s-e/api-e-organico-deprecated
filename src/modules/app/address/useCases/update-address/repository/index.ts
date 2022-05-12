import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateAddressDTO } from '../dtos';

@Injectable()
export class UpdateAddressRepository {
  constructor(@InjectRepository(Address) private readonly address: Repository<Address>) {}

  public exec(data: Omit<UpdateAddressDTO, 'userId'>): Promise<UpdateResult> {
    return this.address.update({ id: data.id }, data);
  }
}
