import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateUserModule } from '@src/modules/app/user/useCases/create-user';
import { FindUserModule } from '@src/modules/app/user/useCases/find-user';
import { CommonModule } from '@src/modules/common';

import * as C from './controllers';
import * as S from './services';

const providers = [...Object.values(S)];
const controllers = [...Object.values(C)];

@Module({
  imports: [CreateUserModule, FindUserModule, CommonModule],
  controllers,
  providers
})
export class SignUpModule {}

export const signUpChildren: RouteTree = {
  path: '/sign-up',
  module: SignUpModule
};
