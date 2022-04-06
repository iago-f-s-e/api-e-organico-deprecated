import { ConflictException, Injectable } from '@nestjs/common';
import { FindUserRepository } from '@src/modules/app/domain/user/useCases/find-user/repository';
import { Either, left, right } from '@src/modules/common/either';
import { CacheService } from '@src/modules/common/services';

type Response = Promise<Either<ConflictException, null>>;

@Injectable()
export class ReservePhoneService {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly cacheService: CacheService
  ) {}

  public async exec(phone: string, key: string): Response {
    const phoneExists = await this.findUser.findByPhone(phone);

    if (phoneExists) return left(new ConflictException('The user phone already exists.'));

    // TODO: usar observabilidade para tratar erro
    this.cacheService.set(key, { phone }).catch(err => console.error(err));

    return right(null);
  }
}