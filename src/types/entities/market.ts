import { Market } from '@src/infra/database/entities';
import { FindManyOptions } from 'typeorm';

export type FindMarketOptions = {
  FIND_ALL: FindManyOptions<Market>;
};
