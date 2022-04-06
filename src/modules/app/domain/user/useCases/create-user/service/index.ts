import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterConsumerDTO } from '@src/modules/app/auth/sign-up/useCases/register-consumer/dtos';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types';
import { User } from '@src/modules/database/entities';
import { FindUserRepository } from '../../find-user/repository';
import { CreateUserRepository } from '../repository';

// TODO: adicionar user type
// TODO: verificar qual propriedade existe
@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUser: CreateUserRepository,
    private readonly findUser: FindUserRepository
  ) {}

  public async exec(data: RegisterConsumerDTO): CreateResponse<User> {
    const thereIsSome = (
      await Promise.all([
        this.findUser.findByDocument(data.document),
        this.findUser.findByEmail(data.email),
        this.findUser.findByPhone(data.phone)
      ])
    ).filter(user => !!user);

    if (!!thereIsSome.length) return left(new ConflictException('The user already exists.'));

    return right(await this.createUser.exec(data));
  }
}
