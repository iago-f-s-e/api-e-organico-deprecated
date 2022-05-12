import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule, authPrefix } from '../auth';
import { DomainModule } from './domain';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, DomainModule, UserModule, RouterModule.register([authPrefix])]
})
export class AppModule {}
