import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findOptions } from '@src/domain/constants';
import { Repository } from 'typeorm';
import { Producer } from '../entities';

@Injectable()
export class ProducerRepository {
  constructor(@InjectRepository(Producer) private readonly producer: Repository<Producer>) {}

  public findAll(): Promise<Producer[]> {
    return this.producer.find(findOptions.producer.FIND_ALL);
  }
}
