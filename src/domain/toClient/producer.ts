import { Producer } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { MinimalProducerToClient, ProducerMakeDelivery, ProducerToClient } from '../dtos/producer';
import { addressToClient } from './address';
import { minimalMarketToClient } from './market';
import { minimalProducerProductToClient } from './producer-product';

type MakeDeliveryToClient = (producer: Producer) => ProducerMakeDelivery;
type MinimalToClient = (producer: Producer) => MinimalProducerToClient;
type ToClient = (producer: Producer) => ProducerToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const producerMakeDeliveryToClient: MakeDeliveryToClient = producer => ({
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

export const producerToClient: ToClient = producer => ({
  id: producer.id,
  name: capitalize(producer.user.name),
  image: defaultImage,
  score: {
    rating: producer.user.score.rating,
    transactions: producer.user.score.transactions
  },
  address: addressToClient(producer.user.address[0]),
  markets: producer.producerMarkets
    .map(producerMarket => minimalMarketToClient(producerMarket.market))
    .sort((prev, next) => prev.name.localeCompare(next.name)),
  products: producer.producerProducts
    .map(producerProduct => minimalProducerProductToClient(producerProduct))
    .sort((prev, next) => prev.name.localeCompare(next.name)),
  property: {
    images: [
      { image: defaultImage },
      { image: defaultImage },
      { image: defaultImage },
      { image: defaultImage }
    ]
  }
});
