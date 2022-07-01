import Redis from 'ioredis';
import * as Settings from '@src/server/settings';

const tls = Settings.IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const redisConnection = new Redis(Settings.REDIS_URI, {
  connectTimeout: Settings.REDIS_TIMEOUT,
  tls
});
