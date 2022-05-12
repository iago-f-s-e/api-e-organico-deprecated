import { AddressToClient } from '../../address/dtos';
import { ProducerToClientDTO } from '../../producer/dtos';

export type UserToClientDTO = {
  id: string;
  userType: 'consumer' | 'producer';
  name: string;
  phone: string;
  email: string;
  address?: AddressToClient;
  producer?: ProducerToClientDTO;
};
