import { Address } from '../entities';

/**
 * Rua: Avenida Maranhão
 * Número: 379
 * CEP: 49060-400
 * Bairro: Santo Antônio
 * Cidade: Aracaju
 * Estado: Sergipe
 * Complemento: Fazenda nova esperança
 */

/**
 * Street: 2+mYHtEkT/lUyVCPkapkHxqHLuY50q/cwHQXHkCvgFtjzr7Cb+UgVYj5p/3mP/QR
 * Number: 379
 * ZipCode: 2+mYHtEkT/lUyVCPkapkH66WcOXcRLNoNnZGnzB0Pas=
 * District: 2+mYHtEkT/lUyVCPkapkH3xmjZFL1j2aTrpxCXDSToY=
 * City: ARACAJU,
 * State: SERGIPE
 * Complement: 2+mYHtEkT/lUyVCPkapkH4cF/QsB8gNhfqHHovrEmS4B9MVK6KC9SDKWoRxtvfRg
 */

export const addressFixtures: Omit<Address, 'user' | 'market' | 'property'>[] = [
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
