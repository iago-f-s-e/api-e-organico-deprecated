import { ConflictException, Injectable } from '@nestjs/common';
import { ReserveDocumentDTO } from '@src/domain/dtos/auth/reserve-document.dto';
import { UserRepository } from '@src/infra/database/repositories/user.repository';
import { RedisService } from '@src/infra/redis/services';
import { left, right } from '@src/shared/either';
import { CreateResponse } from '@src/types/responses';

@Injectable()
export class ReserveUserDocument {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly cacheService: RedisService
  ) {}

  private errorMessage(): string {
    return 'The user document already exists.';
  }

  public async exec(data: ReserveDocumentDTO, key: string): CreateResponse<null> {
    const documentExistis = await this.useRepository.existingByDocument(data.document);

    if (documentExistis) return left(new ConflictException(this.errorMessage()));

    this.cacheService.set(key, data).catch(err => console.error(err));

    return right(null);
  }
}
