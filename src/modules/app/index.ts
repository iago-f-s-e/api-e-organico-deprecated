import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule, authPrefix } from './auth';
import { DomainModule } from './domain';

@Module({
  imports: [AuthModule, DomainModule, RouterModule.register([authPrefix])]
})
export class AppModule {}
