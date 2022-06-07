import { Market } from '@src/infra/database/entities';
import { FindMarketOptions } from '@src/types/entities';
import { FindManyOptions, IsNull, Not } from 'typeorm';

const findAll: FindManyOptions<Market> = {
  where: {
    isActive: true,
    address: {
      marketId: Not(IsNull())
    },
    score: {
      marketId: Not(IsNull())
    }
  },
  order: {
    name: 'ASC',
    score: {
      transactions: 'DESC'
    }
  },
  select: {
    id: true,
    name: true,
    address: {
      id: true,
      state: true,
      city: true,
      district: true,
      street: true,
      complement: true,
      number: true,
      zipCode: true
    },
    workdays: {
      id: true,
      weekday: true,
      opening: true,
      closing: true
    },
    score: {
      transactions: true
    }
  },
  relations: {
    address: true,
    score: true,
    workdays: true
  }
};

export const market: FindMarketOptions = {
  FIND_ALL: findAll
};
