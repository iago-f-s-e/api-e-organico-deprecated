import { ValidateEmail } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  email: ValidateEmail;
  password: string;
};

export type Assert = {
  emailOrError: Right<null, ValidateEmail>;
};

export type Set = {
  emailOrError: ValidateResponse<ValidateEmail>;
};

export type Errors = {
  email: string;
};
