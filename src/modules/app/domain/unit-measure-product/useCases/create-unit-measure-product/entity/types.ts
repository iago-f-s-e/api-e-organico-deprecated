import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  unitMeasureId: ValidateUUID;
};

export type Assert = {
  unitMeasureIdOrError: Right<null, ValidateUUID>;
};

export type Set = {
  unitMeasureIdOrError: ValidateResponse<ValidateUUID>;
};

export type Errors = {
  unitMeasureId: string;
};
