import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { Transaction } from '@src/infra/database/entities';
import { TransactionRepository } from '@src/infra/database/repositories';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public exec(data: CreateTransactionDTO): Promise<Transaction> {
    return this.repository.insert(data);
  }
}
