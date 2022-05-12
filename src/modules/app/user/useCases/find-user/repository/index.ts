import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public existingByDocument(document: string): Promise<User | null> {
    return this.user.findOne({
      where: { document },
      select: {
        id: true
      }
    });
  }

  public existingByEmail(email: string): Promise<User | null> {
    return this.user.findOne({
      where: { email },
      select: {
        id: true
      }
    });
  }

  public existingByPhone(email: string): Promise<User | null> {
    return this.user.findOne({
      where: { email },
      select: {
        id: true
      }
    });
  }
}
