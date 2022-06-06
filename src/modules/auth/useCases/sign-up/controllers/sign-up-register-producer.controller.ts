import { Body, Controller, Post } from '@nestjs/common';
import { LoggedUserDTO } from '@src/domain/dtos/auth';
import { UserDTO } from '@src/modules/app/user/dtos';
import { ValidateToCreateUser } from '@src/modules/app/user/useCases/create-user/entity';
import { SignUpRegisterUserService } from '../services';

@Controller('register-producer')
export class SignUpRegisterProducerController {
  constructor(private readonly service: SignUpRegisterUserService) {}

  @Post()
  public async exec(@Body() body: UserDTO): Promise<LoggedUserDTO> {
    const user = new ValidateToCreateUser(body);

    const createOrError = await this.service.exec(user.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
