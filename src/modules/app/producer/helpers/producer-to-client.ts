import { Producer } from '@src/infra/database/entities';
import { ProducerToClientDTO } from '../dtos';

export function producerToClient(data: Producer): ProducerToClientDTO {
  return {
    makeDelivery: data.makeDelivery
  };
}
