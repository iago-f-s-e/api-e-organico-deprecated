import { Transaction } from '@src/infra/database/entities';
import { MinimalConsumerTransactionToClient } from '../dtos/transaction';

type MinimalConsumerToClient = (transaction: Transaction) => MinimalConsumerTransactionToClient;

export const minimalTransactionToClient: MinimalConsumerToClient = transaction => ({
  id: transaction.id,
  total: transaction.total,
  productQuantity: transaction.productQuantity,
  status: transaction.status,
  type: transaction.type,
  producer: {
    id: transaction.producer.id,
    name: transaction.producer.user.name
  },
  payment: {
    id: transaction.payment.id,
    name: transaction.payment.name
  },
  market: {
    id: transaction.market.id,
    name: transaction.market.name
  }
});
