import { MarketToClient } from './market-to-client.dto';

export type GetMarket = Promise<MarketToClient | MarketToClient[]>;
