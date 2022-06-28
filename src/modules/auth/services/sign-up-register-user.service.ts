import { Injectable } from '@nestjs/common';
import { LoggedUserDTO } from '@src/domain/dtos/auth';
import { CreateUserDTO } from '@src/domain/dtos/user';
import { userToClient } from '@src/domain/toClient';
import { CreateUserUserCase } from '@src/modules/user/useCases';
import { TokenService } from '@src/modules/common/services';
import { CreateResponse } from '@src/types/responses';
import { left, right } from '@src/shared/either';

@Injectable()
export class SignUpRegisterUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUserCase,
    private readonly tokenService: TokenService
  ) {}

  public async exec(data: CreateUserDTO): CreateResponse<LoggedUserDTO> {
    const createOrError = await this.createUserUseCase.exec(data);

    if (createOrError.isLeft()) return left(createOrError.value);

    const user = userToClient(createOrError.value);
    const token = this.tokenService.generate({ id: user.id, userType: user.userType });

    return right({ token, user });
  }
}
