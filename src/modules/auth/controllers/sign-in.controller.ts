import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDTO, LoggedUserDTO } from '@src/domain/dtos/auth';
import { SignInModel } from '@src/domain/models/auth';

import { SignInService } from '../services';

@Controller('sign-in')
export class SignInController {
  constructor(private readonly service: SignInService) {}

  @Post()
  public async exec(@Body() body: CredentialsDTO): Promise<LoggedUserDTO> {
    const credentials = new SignInModel(body);

    const signInOrError = await this.service.exec(credentials.value);

    if (signInOrError.isLeft()) throw signInOrError.value;

    return signInOrError.value;
  }
}
