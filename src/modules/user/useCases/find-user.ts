import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@src/infra/database/entities';
import { UserRepository } from '@src/infra/database/repositories/user.repository';
import { left, right } from '@src/shared/either';
import { FindResponse } from '@src/types/responses';

@Injectable()
export class FindUserUserCase {
  constructor(private readonly repository: UserRepository) {}

  public async byEmail(email: string): FindResponse<User> {
    const [user] = await this.repository.findByEmail(email);

    if (!user) return left(new NotFoundException('User not found'));

    return right(user);
  }
}
