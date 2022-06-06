import { Producer } from '../entities';

export const producerFixtures: Omit<
  Producer,
  'user' | 'producerProducts' | 'producerMarkets' | 'status' | 'properties'
>[] = [
  {
    id: '90baed0b-6c04-401a-92d7-94641228d008',
    certificationType: 'IN CONVERSION',
    makeDelivery: false
  }
];
