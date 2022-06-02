import { ConflictException, Injectable } from '@nestjs/common';
import { RedisService } from '@src/infra/redis/services';
import { FindUserRepository } from '@src/modules/app/user/useCases/find-user/repository';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types';
import { ReserveEmailDTO } from '../dtos';

@Injectable()
export class ReserveUserEmail {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly cacheService: RedisService
  ) {}

  private errorMessage(): string {
    return 'The user email already exists.';
  }

  public async exec(data: ReserveEmailDTO, key: string): CreateResponse<null> {
    const emailExistis = await this.findUser.existingByEmail(data.email);

    if (emailExistis) return left(new ConflictException(this.errorMessage()));

    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
