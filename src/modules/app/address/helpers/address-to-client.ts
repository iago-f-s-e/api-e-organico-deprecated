import { Address } from '@src/infra/database/entities';
import { AddressToClient } from '../dtos';

export function addressToClient(data: Address): AddressToClient {
  return {
    id: data.id,
    city: data.city,
    complement: data.complement,
    district: data.district,
    state: data.state,
    street: data.street,
    zipCode: data.zipCode,
    number: data.number
  };
}
