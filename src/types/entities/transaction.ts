export type TransactionType = 'pick' | 'delivery';

export type TransactionStatus =
  | 'delivered'
  | 'en-route'
  | 'canceled-by-producer'
  | 'canceled-by-consumer'
  | 'confirmed-by-producer'
  | 'confirmed-by-consumer'
  | 'waiting-for-payment'
  | 'waiting-for-consumer-to-withdraw'
  | 'waiting-for-confirmation-from-the-producer'
  | 'in-separation';

export enum transactionType {
  'pick' = 'pick',
  'delivery' = 'delivery'
}
