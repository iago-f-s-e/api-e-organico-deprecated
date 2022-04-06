import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateUserModule } from '@src/modules/app/domain/user/useCases/create-user';
import { CommonModule } from '@src/modules/common';
import { RegisterConsumerController } from './controller';
import { RegisterConsumerService } from './service';

@Module({
  imports: [CommonModule, CreateUserModule],
  controllers: [RegisterConsumerController],
  providers: [RegisterConsumerService]
})
export class RegisterConsumerModule {}

export const registerConsumerChildren: RouteTree = {
  path: '/register-consumer',
  module: RegisterConsumerModule
};
