import { maxSize } from '@src/domain/constants';
import { CredentialsDTO } from '@src/domain/dtos/auth';
import { ValidateEmail } from '@src/domain/validators';
import { ToBeAssert } from '@src/domain/validators/on-error';
import { ValidateResponse } from '@src/types/responses';
import { Assert, Errors, Set, Validated } from './sign-in.type';

export class SignInModel {
  private readonly toSignIn: CredentialsDTO;
  protected emailOrError!: ValidateResponse<ValidateEmail>;

  constructor(data: CredentialsDTO) {
    this.set(data);

    this.assert(this.emailOrError);

    const email = this.emailOrError.value;
    const password = data.password;

    this.toSignIn = this.afterValidate({ email, password });
  }

  private set(data: CredentialsDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.emailOrError = ValidateEmail.exec(
      data.email,
      { maxSize: maxSize.USER_EMAIL },
      {
        errorMessage: errorMessage.email
      }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: CredentialsDTO): Errors {
    return {
      email: `The email ${data.email}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CredentialsDTO {
    return {
      email: validated.email.value,
      password: validated.password
    };
  }

  public get value(): Readonly<CredentialsDTO> {
    return Object.freeze(this.toSignIn);
  }
}
