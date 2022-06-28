import { MinimalConsumerTransactionToClient } from './transaction-to-client.dto';

export type GetTransaction = Promise<MinimalConsumerTransactionToClient[]>;
