import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { reserveDocumentChildren, ReserveDocumentModule } from './useCases/reserve-document';
import { reserveEmailChildren, ReserveEmailModule } from './useCases/reserve-email';
import { reservePhoneChildren, ReservePhoneModule } from './useCases/reserve-phone';

@Module({
  imports: [ReservePhoneModule, ReserveDocumentModule, ReserveEmailModule]
})
export class SignUpModuleV2 {}

export const signUpChildrenV2: RouteTree = {
  path: '/sign-up',
  module: SignUpModuleV2,
  children: [reservePhoneChildren, reserveDocumentChildren, reserveEmailChildren]
};
