import { CreateAddressDTO } from '@src/modules/app/address/useCases/create-address/dtos';
import { CreateProducerDTO } from '@src/modules/app/producer/useCases/create-producer/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/modules/common/validators';

export type Validated = {
  name: ValidateString;
  phone: ValidateString;
  email: ValidateEmail;
  password: ValidateString;
  document: ValidateDocument;
  address: CreateAddressDTO[];
  producer?: CreateProducerDTO;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  phoneOrError: Right<null, ValidateString>;
  emailOrError: Right<null, ValidateEmail>;
  passwordOrError: Right<null, ValidateString>;
  documentOrError: Right<null, ValidateDocument>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  phoneOrError: ValidateResponse<ValidateString>;
  emailOrError: ValidateResponse<ValidateEmail>;
  passwordOrError: ValidateResponse<ValidateString>;
  documentOrError: ValidateResponse<ValidateDocument>;
};

export type Errors = {
  name: string;
  phone: string;
  email: string;
  document: string;
  password: string;
};
