import { AddressDTO } from '../../address/dtos';
import { ProducerDTO } from '../../producer/dtos';

export type UserDTO = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: AddressDTO;
  producer?: ProducerDTO;
};
