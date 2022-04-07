import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { FindUserModule } from '@src/modules/app/user/useCases/find-user';
import { CommonModule } from '@src/modules/common';
import { ReserveEmailController } from './controller';
import { ReserveEmailService } from './service';

@Module({
  imports: [CommonModule, FindUserModule],
  controllers: [ReserveEmailController],
  providers: [ReserveEmailService]
})
export class ReserveEmailModule {}

export const reserveEmailChildren: RouteTree = {
  path: '/reserve-email',
  module: ReserveEmailModule
};
