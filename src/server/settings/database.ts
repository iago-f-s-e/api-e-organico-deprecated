import { LoggerOptions } from 'typeorm';
import { resolve } from 'path';

const dir = resolve(__dirname, '..', '..');

export const DB_HOST = process.env.DB_HOST || 'db';

export const DB_PORT = Number(process.env.DB_PORT) || 5432;

export const DB_NAME = process.env.DB_NAME || 'api_eorganico';

export const DB_USER = process.env.DB_USER || 'postgres';

export const DB_PASS = process.env.DB_PASS || 'postgres';

export const DB_PATH_ENTITIES = `${dir}/modules/database/entities/*.{ts,js}`;

export const DB_PATH_MIGRATIONS = `${dir}/modules/database/migrations/*.{ts,js}`;

export const DB_PATH_SAVE_MIGRATIONS = `${dir}/modules/database/migrations`;

export const DB_PATH_SEEDS = `${dir}/modules/database/seeds/*.{ts,js}`;

export const DB_PATH_SAVE_SEEDS = `${dir}/modules/database/seeds`;

export const DB_LOGGING: LoggerOptions = ['error', 'warn', 'query'];

export const TRANSFORMER_KEY_SECURITY = process.env.TRANSFORMER_KEY_SECURITY || 'secret';
export const TRANSFORMER_KEY_IV = process.env.TRANSFORMER_KEY_IV || 'secret';
