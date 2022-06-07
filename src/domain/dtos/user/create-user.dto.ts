import { Score } from '@src/infra/database/entities';
import { CreateAddressDTO } from '@src/modules/app/address/useCases/create-address/dtos';
import { CreateProducerDTO } from '../producer';

export type CreateUserDTO = {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
  address: CreateAddressDTO[];
  producer?: CreateProducerDTO;
  score: Score;
};
