import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@src/modules/common';
import { User } from '@src/infra/database/entities';
import { FindUserModule } from '../find-user';
import { CreateUserRepository } from './repository';
import { CreateUserService } from './service';
import { InfraModule } from '@src/infra';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FindUserModule, CommonModule, InfraModule],
  exports: [CreateUserService],
  providers: [CreateUserRepository, CreateUserService]
})
export class CreateUserModule {}
