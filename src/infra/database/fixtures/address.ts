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

export const addressFixtures: Omit<Address, 'user' | 'market' | 'property'>[] = [
  {
    id: 'ae8d5bb5-b314-4da1-8afe-65f0a1f550c7',
    userId: '90baed0b-6c04-401a-92d7-94641228d008',
    marketId: null as unknown as string,
    propertyId: null as unknown as string,
    state: 'SERGIPE',
    city: 'ARACAJU',
    district: '2+mYHtEkT/lUyVCPkapkH3xmjZFL1j2aTrpxCXDSToY=',
    street: '2+mYHtEkT/lUyVCPkapkHxqHLuY50q/cwHQXHkCvgFtjzr7Cb+UgVYj5p/3mP/QR',
    zipCode: '2+mYHtEkT/lUyVCPkapkH66WcOXcRLNoNnZGnzB0Pas=',
    complement: '2+mYHtEkT/lUyVCPkapkH4cF/QsB8gNhfqHHovrEmS4B9MVK6KC9SDKWoRxtvfRg',
    number: 379
  }
];
