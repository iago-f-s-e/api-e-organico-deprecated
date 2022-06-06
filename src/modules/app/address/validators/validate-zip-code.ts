import { BadRequestException } from '@nestjs/common';
import { OnError } from '@src/domain/validators/on-error';
import { left, right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types';

type Options = {
  maxSize: number;
  minSize: number;
};

export class ValidateZipCode {
  private readonly data: string;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }
  public static exec(
    data: string,
    options: Options,
    onError: OnError
  ): ValidateResponse<ValidateZipCode> {
    if (!this.isValid(data, options)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateZipCode(data));
  }

  public get value(): string {
    return this.data;
  }

  private static isValid(data: string, options: Options): boolean {
    return (
      !!data && data.replace(/\D/g, '').length >= options.minSize && data.length <= options.maxSize
    );
  }
}
