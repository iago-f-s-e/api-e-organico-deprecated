import { ValidateNumber, ValidateUUID } from '@src/domain/validators';
import { Right } from '@src/shared/either';
import { ValidateResponse } from '@src/types/responses';

export type Validated = {
  productId: ValidateUUID;
  producerId: ValidateUUID;
  unitMeasureId: ValidateUUID;
  price: ValidateNumber;
  stock: ValidateNumber;
  harvestDate: Date;
};

export type Assert = {
  productIdOrError: Right<null, ValidateUUID>;
  producerIdOrError: Right<null, ValidateUUID>;
  unitMeasureIdOrError: Right<null, ValidateUUID>;
  priceOrError: Right<null, ValidateNumber>;
  stockOrError: Right<null, ValidateNumber>;
};

export type Set = {
  productIdOrError: ValidateResponse<ValidateUUID>;
  producerIdOrError: ValidateResponse<ValidateUUID>;
  unitMeasureIdOrError: ValidateResponse<ValidateUUID>;
  priceOrError: ValidateResponse<ValidateNumber>;
  stockOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  productId: string;
  producerId: string;
  unitMeasureId: string;
  price: string;
  stock: string;
};
