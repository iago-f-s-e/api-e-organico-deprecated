import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { PassService } from '@src/modules/common/services';
import { CreateResponse } from '@src/modules/common/types/responses';
import { User } from '@src/infra/database/entities';
import { UserToClientDTO } from '../../../dtos';
import { userToClient } from '../../../helpers';

import { FindUserRepository } from '../../find-user/repository';
import { CreateUserDTO } from '../dtos';
import { CreateUserRepository } from '../repository';
import { RedisService } from '@src/infra/redis/services';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUser: CreateUserRepository,
    private readonly findUser: FindUserRepository,
    private readonly passService: PassService,
    private readonly cacheService: RedisService
  ) {}

  private async clearCache(user: User): Promise<void> {
    const document = `@document:${user.document}`;
    const email = `@email:${user.email}`;
    const phone = `@phone:${user.phone}`;

    this.cacheService.del(document, email, phone).catch(err => console.error(err));
  }

  private errorMessage(data: CreateUserDTO, prop: 'email' | 'cpf'): string {
    return `The ${prop} "${prop === 'cpf' ? data.document : data.email}" already exists`;
  }

  public async exec(data: CreateUserDTO): CreateResponse<UserToClientDTO> {
    const [documentExists, emailExists, password] = await Promise.all([
      this.findUser.existingByDocument(data.document),
      this.findUser.existingByEmail(data.email),
      this.passService.hash(data.password)
    ]);

    if (documentExists) return left(new ConflictException(this.errorMessage(data, 'cpf')));

    if (emailExists) return left(new ConflictException(this.errorMessage(data, 'email')));

    const user = await this.createUser.exec({ ...data, password });

    this.clearCache(user);

    return right(userToClient(user));
  }
}
