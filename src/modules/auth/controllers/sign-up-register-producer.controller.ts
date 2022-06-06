import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '@src/domain/dtos/user';
import { CreateUserModel } from '@src/domain/models/user';

@Controller('register-producer')
export class SignUpRegisterProducerController {
  @Post()
  public async exec(@Body() body: UserDTO): Promise<void> { // eslint-disable-line 

    new CreateUserModel(body).value;
  }
}
