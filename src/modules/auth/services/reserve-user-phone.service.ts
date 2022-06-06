import { ConflictException, Injectable } from '@nestjs/common';
import { ReservePhoneDTO } from '@src/domain/dtos/auth/reserve-phone.dto';
import { UserRepository } from '@src/infra/database/repositories/user.repository';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class ReserveUserPhone {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cacheService: RedisService
  ) {}

  private errorMessage(): string {
    return 'The user phone already exists.';
  }

  public async exec(data: ReservePhoneDTO, key: string): CreateResponse<null> {
    const phoneExistis = await this.useRepository.existingByPhone(data.phone);

    if (phoneExistis) return left(new ConflictException(this.errorMessage()));

    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
