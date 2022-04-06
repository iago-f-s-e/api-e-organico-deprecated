import { Module } from '@nestjs/common';
import { FindUserModule } from './useCases/find-user';

@Module({
  imports: [FindUserModule]
})
export class UserModule {}
