import { Market } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { workdayOrder } from '../constants';
import { MarketToClient, MinimalMarketToClient } from '../dtos/market';
import { addressToClient } from './address';
import { minimalProducerToClient } from './producer';
import { workdayToClient } from './workday';

type MinimalToClient = (market: Market) => MinimalMarketToClient;
type ToClient = (market: Market) => MarketToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const marketToClient: ToClient = market => ({
  id: market.id,
  name: capitalize(market.name),
  image: defaultImage,
  address: addressToClient(market.address),
  workdays: market.workdays
    .map(workday => workdayToClient(workday))
    .sort((prev, next) => workdayOrder[prev.weekday] - workdayOrder[next.weekday]),
  score: {
    transactions: market.score.transactions
  },
  producers: market.producerMarkets
    .map(producerMarket => minimalProducerToClient(producerMarket.producer))
    .sort((prev, next) => prev.name.localeCompare(next.name))
});

export const minimalMarketToClient: MinimalToClient = market => ({
  id: market.id,
  name: capitalize(market.name),
  image: defaultImage,
  address: addressToClient(market.address),
  workdays: market.workdays
    .map(workday => workdayToClient(workday))
    .sort((prev, next) => workdayOrder[prev.weekday] - workdayOrder[next.weekday]),
  score: {
    transactions: market.score.transactions
  }
});
