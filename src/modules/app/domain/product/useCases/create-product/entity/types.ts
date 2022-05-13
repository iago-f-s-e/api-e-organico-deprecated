import { CreateUnitMeasureProductDTO } from '@src/modules/app/domain/unit-measure-product/useCases/create-unit-measure-product/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';

export type Validated = {
  name: ValidateString;
  type: ValidateString;
  unitMeasureProducts: CreateUnitMeasureProductDTO[];
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
