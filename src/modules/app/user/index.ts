import { Module } from '@nestjs/common';
import { CreateUserModule } from './useCases/create-user';
import { FindUserModule } from './useCases/find-user';

@Module({
  imports: [FindUserModule, CreateUserModule]
})
export class UserModule {}
