import { Workday } from '@src/infra/database/entities';
import { TransactionStatus, TransactionType } from '@src/types/entities';
import { AddressToClient } from '../address';
import { MinimalConsumerToClient } from '../consumer';
import { MinimalMarketToClient } from '../market';
import { PaymentToClient } from '../payment';
import { MinimalProducerToClient } from '../producer';

export type MinimalTransactionToClient = {
  id: string;
  producer?: MinimalProducerToClient;
  consumer?: MinimalConsumerToClient;
  total: number;
  productQuantity: number;
  payment: PaymentToClient;
  information: {
    type: TransactionType;
    market?: MinimalMarketToClient;
    selectedDay?: Workday;
    address?: AddressToClient;
  };
};

export type MinimalConsumerTransactionToClient = {
  id: string;
  total: number;
  productQuantity: number;
  status: TransactionStatus;
  type: TransactionType;
  market: {
    id: string;
    name: string;
  };
  producer: {
    id: string;
    name: string;
  };
  payment: {
    id: string;
    name: string;
  };
};
