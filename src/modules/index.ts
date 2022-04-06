import { Module } from '@nestjs/common';
import { AppModule } from './app';
import { CommonModule } from './common';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, CommonModule, AppModule]
})
export class Modules {}
