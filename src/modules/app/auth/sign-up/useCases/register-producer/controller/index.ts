import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@src/modules/database/entities';
import { RegisterProducerDTO } from '../dtos';
import { RegisterProducerService } from '../service';

@Controller()
export class RegisterProducerController {
  constructor(private readonly service: RegisterProducerService) {}

  @Post()
  public async exec(@Body() body: RegisterProducerDTO): Promise<User> {
    const registerOrError = await this.service.exec(body);

    if (registerOrError.isLeft()) throw registerOrError.value;

    return registerOrError.value;
  }
}
