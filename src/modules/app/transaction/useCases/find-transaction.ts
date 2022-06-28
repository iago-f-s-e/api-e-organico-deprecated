import { Injectable } from '@nestjs/common';
import { Transaction } from '@src/infra/database/entities';
import { TransactionRepository } from '@src/infra/database/repositories';
import { CurrentUser } from '@src/types/global';

@Injectable()
export class FindTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  public findInProgress(current: CurrentUser): Promise<Transaction[]> {
    return this.repository.findConsumerTransactionInProgress(current.id);
  }
}
