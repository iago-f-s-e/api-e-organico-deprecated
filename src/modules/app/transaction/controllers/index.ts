import { Body, Controller, Post } from '@nestjs/common';
import { TransactionDTO } from '@src/domain/dtos/transaction';
import { CreateTransactionModel } from '@src/domain/models/app/transaction';
import { Transaction } from '@src/infra/database/entities';
import { CreateTransactionUseCase } from '../useCases';

@Controller()
export class TransactionController {
  constructor(private readonly createUseCase: CreateTransactionUseCase) {}

  @Post()
  public create(@Body() body: TransactionDTO): Promise<Transaction> {
    const transaction = new CreateTransactionModel(body);

    return this.createUseCase.exec(transaction.value);
  }
}
