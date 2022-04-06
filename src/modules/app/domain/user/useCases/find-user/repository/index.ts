import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public findByPhone(phone: string): Promise<User | null> {
    return this.user.findOneBy({ phone });
  }
}
