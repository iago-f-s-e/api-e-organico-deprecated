import { Workday } from '../entities';

export const workdayFixtures: Omit<Workday, 'market' | 'isActive' | 'transactions'>[] = [
  {
    id: '5a3ae7c6-0588-4550-9af0-48786893a912',
    marketId: '66ac5b51-8b01-4a70-8472-00f863c0acf4',
    weekday: 'THURSDAY',
    closing: '22:00',
    opening: '19:00'
  },
  {
    id: 'd59bf7f2-8551-423d-9e95-5e8adc223dc4',
    marketId: '66ac5b51-8b01-4a70-8472-00f863c0acf4',
    weekday: 'SATURDAY',
    closing: '22:00',
    opening: '19:00'
  }
];
