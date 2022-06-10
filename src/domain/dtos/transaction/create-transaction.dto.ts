import { TransactionType } from '@src/types/entities';
import { Nil } from '@src/types/global';
import { CreateTransactionProductDTO } from '../transaction-product';

export type CreateTransactionDTO = {
  consumerId: string;
  producerId: string;
  paymentId: string;
  selectedDayId: string | Nil;
  marketId: string | Nil;
  addressId: string | Nil;
  total: number;
  productQuantity: number;
  type: TransactionType;
  transactionProducts: CreateTransactionProductDTO[];
};
