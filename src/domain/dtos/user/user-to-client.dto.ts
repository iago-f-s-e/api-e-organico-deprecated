import { AddressToClient } from '../address';
import { ProducerMakeDelivery } from '../producer';

export type UserToClient = {
  id: string;
  userType: 'consumer' | 'producer';
  name: string;
  phone: string;
  email: string;
  address?: AddressToClient;
  producer?: ProducerMakeDelivery;
};
