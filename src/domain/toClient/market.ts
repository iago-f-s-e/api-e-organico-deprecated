import { Market } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { MarketToClient } from '../dtos/market';
import { addressToClient } from './address';
import { workdayToClient } from './workday';

type ToClient = (market: Market) => MarketToClient;

export const marketToClient: ToClient = market => ({
  id: market.id,
  name: capitalize(market.name),
  address: addressToClient(market.address),
  workdays: market.workdays.map(workday => workdayToClient(workday))
});
