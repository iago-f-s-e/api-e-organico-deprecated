import { AddressToClient } from '../address';
import { MinimalProducerToClient } from '../producer';
import { WorkdayToClient } from '../workday';

export type MinimalMarketToClient = {
  id: string;
  name: string;
  image: string;
  address: AddressToClient;
  workdays: WorkdayToClient[];
  score: {
    transactions: number;
  };
};

export type MarketToClient = MinimalMarketToClient & {
  producers: MinimalProducerToClient[];
};
