import { Module } from '@nestjs/common';
import { Jwt } from '@src/server/config';

import * as S from './services';

const services = [...Object.values(S)];

@Module({
  imports: [Jwt],
  exports: services,
  providers: services
})
export class CommonModule {}
