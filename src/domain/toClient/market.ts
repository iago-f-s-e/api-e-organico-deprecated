import { Market } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { workdayOrder } from '../constants';
import { MarketToClient } from '../dtos/market';
import { addressToClient } from './address';
import { workdayToClient } from './workday';

type ToClient = (market: Market) => MarketToClient;

const defaultImage =
  'https://www.amigodoclima.com.br/wp-content/themes/amigodoclima/img/not-available.png';

export const marketToClient: ToClient = market => ({
  id: market.id,
  name: capitalize(market.name),
  image: defaultImage, // TODO: salvar imagem
  address: addressToClient(market.address),
  workdays: market.workdays
    .map(workday => workdayToClient(workday))
    .sort((prev, next) => workdayOrder[prev.weekday] - workdayOrder[next.weekday])
});
