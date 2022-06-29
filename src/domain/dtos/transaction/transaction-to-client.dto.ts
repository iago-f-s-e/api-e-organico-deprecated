import { TransactionStatus, TransactionType, Weekday } from '@src/types/entities';
import { PaymentToClient } from '../payment';
import { TransactionProductToClient } from '../transaction-product';
import { UserToClient } from '../user';

export type MutualTransactionToClient = {
  id: string;
  total: number;
  productQuantity: number;
  status: TransactionStatus;
  type: TransactionType;
  market: {
    id: string;
    name: string;
  };
  payment: {
    id: string;
    name: string;
  };
};

export type MinimalConsumerTransactionToClient = MutualTransactionToClient & {
  producer: {
    id: string;
    name: string;
  };
};

export type MinimalProducerTransactionToClient = MutualTransactionToClient & {
  number: number;
  createdAt: Date;
  selectedDay: {
    id: string;
    weekday: Weekday;
  };
  consumer: {
    id: string;
    name: string;
  };
};

export type ProducerTransactionToClient = MinimalProducerTransactionToClient & {
  consumer: UserToClient;
  products: TransactionProductToClient[];
  payment: PaymentToClient;
};
