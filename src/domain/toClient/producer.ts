import { Producer } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { MinimalProducerToClient, ProducerToClient } from '../dtos/producer';

type ToClient = (producer: Producer) => ProducerToClient;
type MinimalToClient = (producer: Producer) => MinimalProducerToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const producerToClient: ToClient = producer => ({
  makeDelivery: producer.makeDelivery
});

export const minimalProducerToClient: MinimalToClient = producer => ({
  id: producer.id,
  name: capitalize(producer.user.name),
  image: defaultImage,
  score: {
    rating: producer.user.score.rating,
    transactions: producer.user.score.transactions
  }
});
