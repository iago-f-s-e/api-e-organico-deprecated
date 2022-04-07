import { Injectable } from '@nestjs/common';
import { CreateUserService } from '@src/modules/app/user/useCases/create-user/service';
import { PassService } from '@src/modules/common/services';
import { CreateResponse } from '@src/modules/common/types';
import { User } from '@src/modules/database/entities';
import { RegisterProducerDTO } from '../dtos';

// TODO: enviar email/sms de confirmação

@Injectable()
export class RegisterProducerService {
  constructor(
    private readonly passService: PassService,
    private readonly createUser: CreateUserService
  ) {}

  public async exec(data: RegisterProducerDTO): CreateResponse<User> {
    const password = await this.passService.hash(data.password);

    const toCreate: RegisterProducerDTO = { ...data, password };

    return this.createUser.exec(toCreate);
  }
}
