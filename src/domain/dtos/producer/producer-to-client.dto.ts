import { AddressToClient } from '../address';
import { MinimalMarketToClient } from '../market';
import { MinimalProducerProductToClient } from '../producer-product';
import { PropertyImageToClient } from '../property';

export type ProducerMakeDelivery = {
  makeDelivery: boolean;
};

export type MinimalProducerToClient = {
  id: string;
  name: string;
  image: string;
  score: {
    transactions: number;
    rating: number;
  };
};

export type ProducerToClient = MinimalProducerToClient & {
  address: AddressToClient;
  markets: MinimalMarketToClient[];
  products: MinimalProducerProductToClient[];
  property: {
    images: PropertyImageToClient[];
  };
};
