import { Producer } from '@src/infra/database/entities';
import { ProducerToClient } from '../dtos/producer';

export function producerToClient(data: Producer): ProducerToClient {
  return {
    makeDelivery: data.makeDelivery
  };
}
