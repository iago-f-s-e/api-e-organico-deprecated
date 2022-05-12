import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateCertification } from '../../../validators';

export type Validated = {
  certificationType: ValidateCertification;
  makeDelivery: boolean;
};

export type Assert = {
  certificationTypeOrError: Right<null, ValidateCertification>;
};

export type Set = {
  certificationTypeOrError: ValidateResponse<ValidateCertification>;
};

export type Errors = {
  certificationType: string;
};
