import { AddressDTO } from '@src/modules/app/address/dtos';

export type ConsumerDTO = {
  type: 'consumer';
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: AddressDTO;
};
