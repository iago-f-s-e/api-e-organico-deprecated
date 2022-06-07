import { ProducerMarket } from '../entities';

export const producerMarketFixtures: Omit<ProducerMarket, 'isActive' | 'producer' | 'market'>[] = [
  {
    producerId: '90baed0b-6c04-401a-92d7-94641228d008',
    marketId: '66ac5b51-8b01-4a70-8472-00f863c0acf4'
  }
];
