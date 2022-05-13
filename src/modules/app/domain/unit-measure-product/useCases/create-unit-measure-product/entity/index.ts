import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { UnitMeasureProductDTO } from '../../../dtos';
import { CreateUnitMeasureProductDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateUnitMeasureProduct {
  private readonly toCreate: CreateUnitMeasureProductDTO;
  protected unitMeasureIdOrError!: ValidateResponse<ValidateUUID>;

  constructor(data: UnitMeasureProductDTO) {
    this.set(data);

    this.assert(this.unitMeasureIdOrError);

    const unitMeasureId = this.unitMeasureIdOrError.value;

    this.toCreate = this.afterValidate({ unitMeasureId });
  }

  private set(data: UnitMeasureProductDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.unitMeasureIdOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.unitMeasureId
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: UnitMeasureProductDTO): Errors {
    return {
      unitMeasureId: `The unit measure id "${data.id}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateUnitMeasureProductDTO {
    return {
      unitMeasureId: validated.unitMeasureId.value
    };
  }

  public get value(): Readonly<CreateUnitMeasureProductDTO> {
    return Object.freeze(this.toCreate);
  }
}
