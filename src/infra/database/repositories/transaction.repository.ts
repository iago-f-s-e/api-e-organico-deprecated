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

  /**
   * ! Por que usar o find e não o findOne e suas variações retornando assim um único elemento e não um array?
   *
   * * O findOne e suas variações usam o LIMIT=1 e por isso (que no momento não sei resolver)
   * * as relações que retornam arrays (transactionProducts por exemplo) também estão sendo limitadas
   * * fazendo que os dados não sejam verdadeiros;
   *
   * ! A mesma "solução" foi implementada em outros repositórios
   */
  public async findProducerTransactionById(id: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: { id },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true,
          type: true
        },
        market: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        },
        consumer: {
          id: true,
          name: true,
          phone: true,
          email: true,
          score: {
            rating: true,
            transactions: true
          },
          address: {
            id: true,
            city: true,
            complement: true,
            district: true,
            number: true,
            state: true,
            street: true,
            zipCode: true
          }
        },
        transactionProducts: {
          id: true,
          quantity: true,
          total: true,
          producerProduct: {
            id: true,
            price: true,
            stock: true,
            harvestDate: true,
            product: {
              name: true
            },
            unitMeasure: {
              name: true
            },
            score: {
              transactions: true
            }
          }
        }
      },

      relations: {
        transactionProducts: {
          producerProduct: {
            product: true,
            unitMeasure: true,
            score: true
          }
        },
        market: true,
        payment: true,
        consumer: {
          address: true,
          score: true
        },
        selectedDay: true
      }
    });
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

  public async findProducerTransactionInProgress(producerId: string): Promise<Transaction[]> {
    return this.transaction.find({
      where: {
        producerId,
        status: Not(In(['delivered', 'canceled-by-producer', 'canceled-by-consumer']))
      },

      select: {
        id: true,
        total: true,
        productQuantity: true,
        type: true,
        status: true,
        number: true,
        createdAt: true,
        payment: {
          id: true,
          name: true
        },
        market: {
          id: true,
          name: true
        },
        consumer: {
          id: true,
          name: true
        },
        selectedDay: {
          id: true,
          weekday: true
        }
      },

      relations: {
        market: true,
        payment: true,
        consumer: true,
        selectedDay: true
      },

      order: {
        updatedAt: 'DESC'
      }
    });
  }
}
