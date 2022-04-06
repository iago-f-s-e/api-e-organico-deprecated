import { DataSourceOptions } from 'typeorm';

import * as Settings from '@src/server/settings';

export const connection: DataSourceOptions & { cli: { migrationsDir: string } } = {
  type: 'postgres',
  host: Settings.DB_HOST,
  port: Settings.DB_PORT,
  database: Settings.DB_NAME,
  username: Settings.DB_USER,
  password: Settings.DB_PASS,
  logging: Settings.DB_LOGGING,
  entities: [Settings.DB_PATH_ENTITIES],
  migrations: [Settings.DB_PATH_MIGRATIONS],
  cli: {
    migrationsDir: Settings.DB_PATH_SAVE_MIGRATIONS
  }
};
