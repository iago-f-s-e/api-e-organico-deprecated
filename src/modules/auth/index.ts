import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateUserModule } from '../app/user/useCases/create-user';
import {
  SignUpRegisterProducerController,
  SignUpReserveUserDocumentController
} from './controllers';
import { signUpChildren } from './useCases/sign-up';
import * as Services from './services';
import { InfraModule } from '@src/infra';
import { CommonModule } from '../common';
import { FindUserModule } from '../app/user/useCases/find-user';

const services = Object.values(Services);

@Module({
  imports: [CreateUserModule, FindUserModule, CommonModule, InfraModule],
  controllers: [SignUpRegisterProducerController, SignUpReserveUserDocumentController],
  providers: services
})
export class AuthModule {}

export const authPrefix: RouteTree = {
  path: '/auth',
  module: AuthModule,
  children: [signUpChildren]
};
