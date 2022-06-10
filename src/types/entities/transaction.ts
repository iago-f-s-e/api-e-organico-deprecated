export type TransactionType = 'pick' | 'delivery';

export type TransactionStatus =
  | 'delivered'
  | 'en-route'
  | 'paid-online'
  | 'canceled-by-producer'
  | 'canceled-by-consumer'
  | 'confirmed-by-producer'
  | 'confirmed-by-consumer'
  | 'waiting-for-payment'
  | 'waiting-for-consumer-to-withdraw'
  | 'waiting-for-confirmation-from-the-producer';

export enum transactionType {
  'pick' = 'pick',
  'delivery' = 'delivery'
}
