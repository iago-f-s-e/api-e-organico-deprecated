import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterConsumerDTO } from '@src/modules/app/auth/sign-up/useCases/register-consumer/dtos';
import { User } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public exec(data: RegisterConsumerDTO): Promise<User> {
    return this.user.save(this.user.create(data));
  }
}
