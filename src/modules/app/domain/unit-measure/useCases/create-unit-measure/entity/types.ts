import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';

export type Validated = {
  name: ValidateString;
  abbreviation: ValidateString;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  abbreviationOrError: Right<null, ValidateString>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  abbreviationOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  name: string;
  abbreviation: string;
};
