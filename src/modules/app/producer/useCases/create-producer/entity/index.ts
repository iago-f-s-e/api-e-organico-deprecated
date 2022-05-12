import { ValidateResponse } from '@src/modules/common/types/responses';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { ProducerDTO } from '../../../dtos';
import { ValidateCertification } from '../../../validators';
import { CreateProducerDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateProducer {
  private readonly toCreate: CreateProducerDTO;
  protected certificationTypeOrError!: ValidateResponse<ValidateCertification>;

  constructor(data: ProducerDTO) {
    this.set(data);

    this.assert(this.certificationTypeOrError);

    const certificationType = this.certificationTypeOrError.value;
    const makeDelivery = data.makeDelivery;

    this.toCreate = this.afterValidate({ certificationType, makeDelivery });
  }

  private set(data: ProducerDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.certificationTypeOrError = ValidateCertification.exec(data.certificationType, {
      errorMessage: errorMessage.certificationType
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ProducerDTO): Errors {
    return {
      certificationType: `The certification type${data.certificationType}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateProducerDTO {
    return {
      certificationType: validated.certificationType.value,
      makeDelivery: validated.makeDelivery
    };
  }

  public get value(): Readonly<CreateProducerDTO> {
    return Object.freeze(this.toCreate);
  }
}
