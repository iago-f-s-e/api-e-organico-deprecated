import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { GetTransaction, TransactionDTO } from '@src/domain/dtos/transaction';
import { CreateTransactionModel } from '@src/domain/models/app/transaction';
import { minimalTransactionToClient, transactionToClient } from '@src/domain/toClient';
import { Transaction } from '@src/infra/database/entities';
import { Current } from '@src/modules/common/guard';
import { CurrentUser } from '@src/types/global';
import { CreateTransactionUseCase, FindTransactionUseCase } from '../useCases';

@Controller()
export class TransactionController {
  constructor(
    private readonly createUseCase: CreateTransactionUseCase,
    private readonly findUseCase: FindTransactionUseCase
  ) {}

  @Post()
  public create(
    @Body() body: TransactionDTO,
    @Current() consumer: CurrentUser
  ): Promise<Transaction> {
    const transaction = new CreateTransactionModel({ ...body, consumer });

    return this.createUseCase.exec(transaction.value);
  }

  @Get('in-progress')
  public async getInProgress(@Current() current: CurrentUser): GetTransaction {
    return (await this.findUseCase.findInProgress(current)).map(transaction =>
      minimalTransactionToClient(transaction, current)
    );
  }

  @Get(':id')
  public async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Current() current: CurrentUser
  ): GetTransaction {
    const transaction = await this.findUseCase.findById(id, current);

    if (transaction.isLeft()) throw transaction.value;

    return transactionToClient(transaction.value, current);
  }
}
