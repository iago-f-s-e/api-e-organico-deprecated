import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '@src/infra/database/repositories';
import { CurrentUser } from '@src/types/global';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  private confirmTransactionByProducer(id: string): void {
    this.repository.updateStatus(id, 'in-separation').catch(err => console.error(err));
  }

  private cancelTransactionByProducer(id: string): void {
    this.repository.updateStatus(id, 'canceled-by-producer').catch(err => console.error(err));
  }

  private deliverTransactionByProducer(id: string): void {
    this.repository.updateStatus(id, 'confirmed-by-producer').catch(err => console.error(err));
  }

  public confirm(id: string, _: CurrentUser): void {
    return this.confirmTransactionByProducer(id);
  }

  public cancel(id: string, _: CurrentUser): void {
    return this.cancelTransactionByProducer(id);
  }

  public separate(id: string): void {
    this.repository
      .updateStatus(id, 'waiting-for-consumer-to-withdraw')
      .catch(err => console.error(err));
  }

  public deliver(id: string, _: CurrentUser): void {
    return this.deliverTransactionByProducer(id);
  }
}
