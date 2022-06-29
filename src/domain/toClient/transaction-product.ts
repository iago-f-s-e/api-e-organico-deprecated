import { TransactionProduct } from '@src/infra/database/entities';
import { TransactionProductToClient } from '../dtos/transaction-product';
import { producerProductToClient } from './producer-product';

type ToClient = (transactionProduct: TransactionProduct) => TransactionProductToClient;

export const transactionProductToClient: ToClient = transactionProduct => ({
  id: transactionProduct.id,
  quantity: transactionProduct.quantity,
  total: transactionProduct.total,
  producerProduct: producerProductToClient(transactionProduct.producerProduct)
});
