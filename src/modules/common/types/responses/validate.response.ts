import { BadRequestException } from '@nestjs/common';
import { Either } from '../../either';

export type ValidateResponse<T> = Either<BadRequestException, T>;
