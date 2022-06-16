import { Injectable } from '@nestjs/common';
import { Payment } from '@src/infra/database/entities';
import { PaymentRepository } from '@src/infra/database/repositories';

@Injectable()
export class FindPaymentUseCase {
  constructor(private readonly repository: PaymentRepository) {}

  public exec(): Promise<Payment[]> {
    return this.repository.findAll();
  }
}
