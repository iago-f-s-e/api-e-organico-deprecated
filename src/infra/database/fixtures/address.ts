import { Address } from '../entities';

export const addressFixtures: Omit<Address, 'user' | 'market' | 'property' | 'transactions'>[] = [
  {
    id: 'ae8d5bb5-b314-4da1-8afe-65f0a1f550c7',
    userId: '90baed0b-6c04-401a-92d7-94641228d008',
    marketId: null as unknown as string,
    propertyId: null as unknown as string,
    state: 'SERGIPE',
    city: 'ARACAJU',
    district: 'Santo Antônio',
    street: 'Avenida Maranhão',
    zipCode: '49060400',
    complement: 'Fazenda nova esperança',
    number: 379
  },
  {
    id: 'a8d806c7-4585-408c-a620-d0d377af04d8',
    userId: '8302f435-243a-480b-a7a3-2a0aaab0c27d',
    marketId: null as unknown as string,
    propertyId: null as unknown as string,
    state: 'SERGIPE',
    city: 'ARACAJU',
    district: 'Santo Antônio',
    street: 'Avenida Maranhão',
    zipCode: '49060400',
    complement: 'Fazenda nova esperança',
    number: 379
  },
  {
    id: 'ad4041f5-2a48-4ca3-be83-54da54bd2fa2',
    userId: null as unknown as string,
    marketId: '66ac5b51-8b01-4a70-8472-00f863c0acf4',
    propertyId: null as unknown as string,
    state: 'SERGIPE',
    city: 'ARACAJU',
    district: 'Santo Antônio',
    street: 'Avenida Maranhão',
    zipCode: '49060400',
    complement: 'Fazenda nova esperança',
    number: 379
  }
];
