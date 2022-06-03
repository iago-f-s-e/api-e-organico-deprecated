import { Address } from '@src/infra/database/entities';
import { capitalize } from '@src/shared/functions';
import { AddressToClient } from '../dtos/address';

type ToClient = (address: Address) => AddressToClient;

export const addressToClient: ToClient = address => ({
  id: address.id,
  state: capitalize(address.state),
  city: capitalize(address.city),
  district: capitalize(address.district),
  street: capitalize(address.street),
  zipCode: address.zipCode,
  complement: address.complement || '',
  number: address.number?.toString() || ''
});
