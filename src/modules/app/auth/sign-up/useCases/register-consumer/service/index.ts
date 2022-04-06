import { Injectable } from '@nestjs/common';
import { CreateUserService } from '@src/modules/app/domain/user/useCases/create-user/service';
import { PassService } from '@src/modules/common/services';
import { CreateResponse } from '@src/modules/common/types';
import { User } from '@src/modules/database/entities';
import { RegisterConsumerDTO } from '../dtos';

// TODO: enviar email/sms de confirmação

@Injectable()
export class RegisterConsumerService {
  constructor(
    private readonly passService: PassService,
    private readonly createUser: CreateUserService
  ) {}

  public async exec(data: RegisterConsumerDTO): CreateResponse<User> {
    const password = await this.passService.hash(data.password);

    const toCreate: RegisterConsumerDTO = { ...data, password };

    return this.createUser.exec(toCreate);
  }
}
