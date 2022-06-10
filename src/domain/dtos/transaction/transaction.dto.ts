import { TransactionType } from '@src/types/entities';

type PickTransaction = {
  type: 'pick';
  market: { id: string };
  selectedDay: { id: string };
};

export type TransactionDTO = {
  id: string;
  status: string;
  total: string;
  producer: { id: string };
  user: { id: string };
  payment: { id: string };
  producerInformation: {
    type: TransactionType;
  };
};
