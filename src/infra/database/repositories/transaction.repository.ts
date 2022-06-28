import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from '@src/domain/dtos/transaction';
import { In, Not, Repository } from 'typeorm';
import { Transaction } from '../entities';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction) private readonly transaction: Repository<Transaction>
  ) {}

  public async insert(data: CreateTransactionDTO): Promise<Transaction> {
    return this.transaction.save(this.transaction.create(data));
  }

  public async findConsumerTransactionInProgress(consumerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        consumerId,
        status: Not(In(['delivered', 'canceled-by-producer', 'canceled-by-consumer']))
      },
      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        producer: {
          id: true,
          user: {
            name: true
          }
        }
      },
      relations: {
        market: true,
        payment: true,
        producer: {
          user: true
        }
      },
      order: {
        updatedAt: 'DESC'
      }
    });
  }
}
