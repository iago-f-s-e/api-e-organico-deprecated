import { ConflictException, Injectable } from '@nestjs/common';
import { ReserveEmailDTO } from '@src/domain/dtos/auth/reserve-email.dto';
import { UserRepository } from '@src/infra/database/repositories/user.repository';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types';

@Injectable()
export class ReserveUserEmail {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cacheService: RedisService
  ) {}

  private errorMessage(): string {
    return 'The user email already exists.';
  }

  public async exec(data: ReserveEmailDTO, key: string): CreateResponse<null> {
    const emailExistis = await this.useRepository.existingByEmail(data.email);

    if (emailExistis) return left(new ConflictException(this.errorMessage()));

    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
