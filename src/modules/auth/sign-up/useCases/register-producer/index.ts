import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateUserModule } from '@src/modules/app/user/useCases/create-user';
import { CommonModule } from '@src/modules/common';
import { RegisterProducerController } from './controller';
import { RegisterProducerService } from './service';

@Module({
  imports: [CommonModule, CreateUserModule],
  controllers: [RegisterProducerController],
  providers: [RegisterProducerService]
})
export class RegisterProducerModule {}

export const registerProducerChildren: RouteTree = {
  path: '/register-producer',
  module: RegisterProducerModule
};
