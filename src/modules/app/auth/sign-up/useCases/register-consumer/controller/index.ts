import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@src/modules/database/entities';
import { RegisterConsumerDTO } from '../dtos';
import { RegisterConsumerService } from '../service';

@Controller()
export class RegisterConsumerController {
  constructor(private readonly service: RegisterConsumerService) {}

  @Post()
  public async exec(@Body() body: RegisterConsumerDTO): Promise<User> {
    const registerOrError = await this.service.exec(body);

    if (registerOrError.isLeft()) throw registerOrError.value;

    return registerOrError.value;
  }
}
