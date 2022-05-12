import { BadRequestException } from '@nestjs/common';
import { left, right } from '../either';
import { ValidateResponse } from '../types/responses';
import { isValidEmail } from './helpers';
import { OnError } from './types';

type Options = {
  maxSize: number;
};

export class ValidateEmail {
  private readonly data: Readonly<string>;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }

  public static exec(
    data: string,
    options: Options,
    onError: OnError
  ): ValidateResponse<ValidateEmail> {
    if (!this.isValid(data, options.maxSize))
      return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateEmail(data));
  }

  private static isValid(data: string, maxSize: number): boolean {
    return !!data && isValidEmail(data, maxSize);
  }

  public get value(): Readonly<string> {
    return this.data;
  }
}
