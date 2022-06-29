import { Transaction } from '@src/infra/database/entities';
import { CurrentUser } from '@src/types/global';
import {
  MinimalConsumerTransactionToClient,
  MinimalProducerTransactionToClient,
  MutualTransactionToClient,
  ProducerTransactionToClient
} from '../dtos/transaction';
import { paymentToClient } from './payment';
import { transactionProductToClient } from './transaction-product';
import { userToClient } from './user';

type MutualToClient = (transaction: Transaction) => MutualTransactionToClient;
type MinimalConsumerToClient = (transaction: Transaction) => MinimalConsumerTransactionToClient;
type MinimalProducerToClient = (transaction: Transaction) => MinimalProducerTransactionToClient;
type ProducerToClient = (transaction: Transaction) => ProducerTransactionToClient;

type MinimalToClient = (
  transaction: Transaction,
  current: CurrentUser
) => MinimalConsumerTransactionToClient | MinimalProducerTransactionToClient;

type ToClient = (transaction: Transaction, current: CurrentUser) => ProducerTransactionToClient;

export const minimalTransactionToClient: MinimalToClient = (transaction, current) => {
  if (current.userType === 'consumer') return minimalConsumerTransactionToClient(transaction);

  return minimalProducerTransactionToClient(transaction);
};

export const transactionToClient: ToClient = (transaction, _) => {
  return producerTransactionToClient(transaction);
};

const mutualToClient: MutualToClient = transaction => ({
  id: transaction.id,
  total: transaction.total,
  productQuantity: transaction.productQuantity,
  status: transaction.status,
  type: transaction.type,
  market: {
    id: transaction.market.id,
    name: transaction.market.name
  },
  payment: {
    id: transaction.payment.id,
    name: transaction.payment.name
  }
});

const minimalConsumerTransactionToClient: MinimalConsumerToClient = transaction => ({
  ...mutualToClient(transaction),
  producer: {
    id: transaction.producer.id,
    name: transaction.producer.user.name
  }
});

const minimalProducerTransactionToClient: MinimalProducerToClient = transaction => ({
  ...mutualToClient(transaction),
  number: transaction.number,
  createdAt: transaction.createdAt,
  selectedDay: {
    id: transaction.selectedDay.id,
    weekday: transaction.selectedDay.weekday
  },
  consumer: {
    id: transaction.consumer.id,
    name: transaction.consumer.name
  }
});

const producerTransactionToClient: ProducerToClient = transaction => ({
  ...minimalProducerTransactionToClient(transaction),
  consumer: userToClient(transaction.consumer),
  payment: paymentToClient(transaction.payment),
  products: transaction.transactionProducts.map(transactionProduct =>
    transactionProductToClient(transactionProduct)
  )
});
