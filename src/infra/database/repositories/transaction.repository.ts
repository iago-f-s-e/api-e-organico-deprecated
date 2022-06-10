import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { Repository } from 'typeorm';
import { Transaction } from '../entities';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction) private readonly transaction: Repository<Transaction>
  ) {}

  public async insert(data: CreateTransactionDTO): Promise<Transaction> {
    return this.transaction.save(this.transaction.create(data));
  }
}
