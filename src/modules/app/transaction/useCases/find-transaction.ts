import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '@src/infra/database/entities';
import { TransactionRepository } from '@src/infra/database/repositories';
import { left, right } from '@src/shared/either';
import { CurrentUser } from '@src/types/global';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  private async producerTransactionById(id: string): FindResponse<Transaction> {
    const [transaction] = await this.repository.findProducerTransactionById(id);

    if (!transaction) return left(new NotFoundException('Transaction not found'));

    return right(transaction);
  }

  public findInProgress(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer')
      return this.repository.findConsumerTransactionInProgress(current.id);

    return this.repository.findProducerTransactionPending(current.id);
  }

  public findPending(current: CurrentUser): Promise<Transaction[]> {
    if (current.userType === 'consumer') return Promise.resolve([]);

    return this.repository.findProducerTransactionPending(current.id);
  }

  public findById(id: string, _: CurrentUser): FindResponse<Transaction> {
    return this.producerTransactionById(id);
  }
}
