import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { RedisModule } from './redis';

@Module({
  imports: [DatabaseModule, RedisModule],
  exports: [DatabaseModule, RedisModule]
})
export class InfraModule {}
