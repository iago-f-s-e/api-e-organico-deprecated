import { maxSize } from '@src/domain/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { UnitMeasureDTO } from '../../../dtos';
import { CreateUnitMeasureDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateUnitMeasure {
  private readonly toCreate: CreateUnitMeasureDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected abbreviationOrError!: ValidateResponse<ValidateString>;

  constructor(data: UnitMeasureDTO) {
    this.set(data);

    this.assert(this.nameOrError, this.abbreviationOrError);

    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;

    this.toCreate = this.afterValidate({ name, abbreviation });
  }

  private set(data: UnitMeasureDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.UNIT_MEASURE_NAME },
      { errorMessage: errorMessage.name }
    );

    this.abbreviationOrError = ValidateString.exec(
      data.abbreviation,
      { isOptional: false, maxSize: maxSize.UNIT_MEASURE_ABBREVIATION },
      { errorMessage: errorMessage.abbreviation }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: UnitMeasureDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      abbreviation: `The abbreviation "${data.abbreviation}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateUnitMeasureDTO {
    return {
      name: validated.name.value.toUpperCase(),
      abbreviation: validated.abbreviation.value
    };
  }

  public get value(): Readonly<CreateUnitMeasureDTO> {
    return Object.freeze(this.toCreate);
  }
}
