import { Injectable } from '@nestjs/common';
import { Producer } from '@src/infra/database/entities';
import { ProducerRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindProducerUseCase {
  constructor(private readonly repository: ProducerRepository) {}

  public exec(): Promise<Producer[]> {
    return this.repository.findAll();
  }
}
