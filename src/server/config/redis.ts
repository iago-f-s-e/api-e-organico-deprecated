import Redis from 'ioredis';
import * as Settings from '../settings';

const tls = Settings.IS_PRODUCTION ? { rejectUnauthorized: false } : undefined;

export const redisClient = new Redis(Settings.REDIS_URI, {
  connectTimeout: Settings.REDIS_TIMEOUT,
  tls
});
