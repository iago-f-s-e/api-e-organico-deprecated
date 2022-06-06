import { ValidateString } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  name: ValidateString;
  type: ValidateString;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  typeOrError: Right<null, ValidateString>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  typeOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  name: string;
  type: string;
};
