import { AddressToClient } from '../address';
import { WorkdayToClient } from '../workday';

export type MarketToClient = {
  id: string;
  name: string;
  address: AddressToClient;
  workdays: WorkdayToClient[];
};
