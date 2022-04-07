import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos';

@Injectable()
export class CreateUserRepository {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  public exec(data: CreateUserDTO): Promise<User> {
    return this.user.save(this.user.create(data));
  }
}
