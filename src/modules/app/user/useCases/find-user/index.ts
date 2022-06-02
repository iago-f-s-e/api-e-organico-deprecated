import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/infra/database/entities';
import { FindUserRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [FindUserRepository],
  providers: [FindUserRepository]
})
export class FindUserModule {}
