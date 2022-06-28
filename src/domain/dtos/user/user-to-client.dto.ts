import { UserType } from '@src/types/entities';
import { AddressToClient } from '../address';
import { ProducerMakeDelivery } from '../producer';

export type UserToClient = {
  id: string;
  userType: UserType;
  name: string;
  phone: string;
  email: string;
  image: string;
  address?: AddressToClient;
  producer?: ProducerMakeDelivery;
};
