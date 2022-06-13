import { Body, Controller, Post } from '@nestjs/common';
import { TransactionDTO } from '@src/domain/dtos/transaction';
import { CreateTransactionModel } from '@src/domain/models/app/transaction';
import { Transaction } from '@src/infra/database/entities';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import { CreateTransactionUseCase } from '../useCases';

@Controller()
export class TransactionController {
  constructor(private readonly createUseCase: CreateTransactionUseCase) {}

  @Post()
  public create(
    @Body() body: TransactionDTO,
    @Current() consumer: CurrentUser
  ): Promise<Transaction> {
    const transaction = new CreateTransactionModel({ ...body, consumer });

    return this.createUseCase.exec(transaction.value);
  }
}
