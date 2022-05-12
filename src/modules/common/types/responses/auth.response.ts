import { UnauthorizedException } from '@nestjs/common';
import { Either } from '../../either';

export type AuthResponse<T> = Either<UnauthorizedException, T>;
