import { Producer } from '@src/infra/database/entities';
import { FindProducerOptions } from '@src/types/entities';
import { FindManyOptions, IsNull, Not } from 'typeorm';

const findAll: FindManyOptions<Producer> = {
  where: {
    status: 'ACTIVE',
    user: {
      isActive: true,
      score: {
        userId: Not(IsNull())
      }
    }
  },
  select: {
    id: true,
    user: {
      name: true,
      score: {
        rating: true,
        transactions: true
      }
    }
  },
  order: {
    user: {
      name: 'ASC',
      score: {
        rating: 'DESC',
        transactions: 'DESC'
      }
    }
  },
  relations: {
    user: {
      score: true
    }
  }
};

export const producer: FindProducerOptions = {
  FIND_ALL: findAll
};
