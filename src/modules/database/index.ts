import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(connection)]
})
export class DatabaseModule {}
