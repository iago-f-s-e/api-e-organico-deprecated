import { FindMarketOptions, FindProducerOptions } from '../entities';

export type AppFindOptions = {
  producer: FindProducerOptions;
  market: FindMarketOptions;
};
