import { MinimalMarketToClient } from './market-to-client.dto';

export type GetMarket = Promise<MinimalMarketToClient | MinimalMarketToClient[]>;
