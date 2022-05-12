import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { signUpChildren, SignUpModule } from './sign-up';

@Module({
  imports: [SignUpModule]
})
export class AuthModule {}

export const authPrefix: RouteTree = {
  path: '/auth',
  module: AuthModule,
  children: [signUpChildren]
};
