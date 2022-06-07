import { Injectable, NotFoundException } from '@nestjs/common';
import { Producer } from '@src/infra/database/entities';
import { ProducerRepository } from '@src/infra/database/repositories';
import { left, right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindProducerUseCase {
  constructor(private readonly repository: ProducerRepository) {}

  public async findById(id: string): FindResponse<Producer> {
    const [producer] = await this.repository.findById(id);

    if (!producer) return left(new NotFoundException('Producer not found'));

    return right(producer);
  }

  public exec(): Promise<Producer[]> {
    return this.repository.findAll();
  }
}
