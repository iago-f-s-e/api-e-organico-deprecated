import { AddressDTO } from '@src/modules/app/address/dtos';

export type ConsumerDTO = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: AddressDTO;
};
