import { Market } from '../entities';

export const marketFixtures: Omit<
  Market,
  'address' | 'workdays' | 'isActive' | 'producerMarkets'
>[] = [
  {
    id: '66ac5b51-8b01-4a70-8472-00f863c0acf4',
    name: 'Feira do Santo Antônio'
  }
];
