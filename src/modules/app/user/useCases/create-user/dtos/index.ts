import { CreateAddressDTO } from '@src/modules/app/address/useCases/create-address/dtos';
import { CreateProducerDTO } from '@src/modules/app/producer/useCases/create-producer/dtos';

export type CreateUserDTO = {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: CreateAddressDTO[];
  producer?: CreateProducerDTO;
};
