import { ConflictException, Injectable } from '@nestjs/common';
import { FindUserRepository } from '@src/modules/app/domain/user/useCases/find-user/repository';
import { Either, left, right } from '@src/modules/common/either';
import { CacheService } from '@src/modules/common/services';
import { ReserveEmailDTO } from '../dtos';

type Response = Promise<Either<ConflictException, null>>;

@Injectable()
export class ReserveEmailService {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly cacheService: CacheService
  ) {}

  public async exec(data: ReserveEmailDTO, key: string): Response {
    const phoneExists = await this.findUser.findByEmail(data.email);

    if (phoneExists) return left(new ConflictException('The user email already exists.'));

    // TODO: usar observabilidade para tratar erro
    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
