import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { reservePhoneChildren, ReservePhoneModule } from './useCases/reserve-phone';

@Module({
  imports: [ReservePhoneModule]
})
export class SignUpModule {}

export const signUpChildren: RouteTree = {
  path: '/sign-up',
  module: SignUpModule,
  children: [reservePhoneChildren]
};
