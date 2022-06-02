import { ValidateToCreateAddress } from '@src/modules/app/address/useCases/create-address/entity';
import { ValidateToCreateProducer } from '@src/modules/app/producer/useCases/create-producer/entity';
import { maxSize, minSize } from '@src/domain/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { UserDTO } from '../../../dtos';
import { CreateUserDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateUser {
  private readonly toCreate: CreateUserDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected phoneOrError!: ValidateResponse<ValidateString>;
  protected emailOrError!: ValidateResponse<ValidateEmail>;
  protected passwordOrError!: ValidateResponse<ValidateString>;
  protected documentOrError!: ValidateResponse<ValidateDocument>;

  constructor(data: UserDTO) {
    this.set(data);

    this.assert(
      this.nameOrError,
      this.phoneOrError,
      this.emailOrError,
      this.passwordOrError,
      this.documentOrError
    );

    const name = this.nameOrError.value;
    const phone = this.phoneOrError.value;
    const email = this.emailOrError.value;
    const password = this.passwordOrError.value;
    const document = this.documentOrError.value;
    const address = [new ValidateToCreateAddress(data.address).value];
    const producer = data.producer ? new ValidateToCreateProducer(data.producer).value : undefined;

    this.toCreate = this.afterValidate({
      name,
      phone,
      email,
      password,
      document,
      address,
      producer
    });
  }

  private set(data: UserDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.USER_NAME },
      { errorMessage: errorMessage.name }
    );

    this.phoneOrError = ValidateString.exec(
      data.phone,
      { isOptional: false, maxSize: maxSize.USER_PHONE },
      { errorMessage: errorMessage.phone }
    );

    this.emailOrError = ValidateEmail.exec(
      data.email,
      { maxSize: maxSize.USER_EMAIL },
      { errorMessage: errorMessage.email }
    );

    this.passwordOrError = ValidateString.exec(
      data.password,
      { isOptional: false, maxSize: maxSize.USER_PASSWORD, minSize: minSize.USER_PASSWORD },
      { errorMessage: errorMessage.password }
    );

    this.documentOrError = ValidateDocument.exec(data.document, {
      errorMessage: errorMessage.document
    });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: UserDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      phone: `The phone "${data.phone}" is invalid`,
      email: `The email "${data.email}" is invalid`,
      password: `The password "${data.password}" is invalid`,
      document: `The cpf "${data.document}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateUserDTO {
    return {
      name: validated.name.value.toUpperCase(),
      phone: validated.phone.value,
      email: validated.email.value.toLowerCase(),
      password: validated.password.value,
      document: validated.document.value,
      address: validated.address,
      producer: validated.producer
    };
  }

  public get value(): Readonly<CreateUserDTO> {
    return Object.freeze(this.toCreate);
  }
}
