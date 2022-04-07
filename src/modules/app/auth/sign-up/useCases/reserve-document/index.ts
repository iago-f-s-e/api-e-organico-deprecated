import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { FindUserModule } from '@src/modules/app/user/useCases/find-user';
import { CommonModule } from '@src/modules/common';
import { ReserveDocumentController } from './controller';
import { ReserveDocumentService } from './service';

@Module({
  imports: [CommonModule, FindUserModule],
  controllers: [ReserveDocumentController],
  providers: [ReserveDocumentService]
})
export class ReserveDocumentModule {}

export const reserveDocumentChildren: RouteTree = {
  path: '/reserve-document',
  module: ReserveDocumentModule
};
