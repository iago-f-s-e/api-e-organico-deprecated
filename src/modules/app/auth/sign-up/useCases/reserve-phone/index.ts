import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { FindUserModule } from '@src/modules/app/domain/user/useCases/find-user';
import { CommonModule } from '@src/modules/common';
import { ReservePhoneController } from './controller';
import { ReservePhoneService } from './service';

@Module({
  imports: [CommonModule, FindUserModule],
  controllers: [ReservePhoneController],
  providers: [ReservePhoneService]
})
export class ReservePhoneModule {}

export const reservePhoneChildren: RouteTree = {
  path: '/reserve-phone',
  module: ReservePhoneModule
};
