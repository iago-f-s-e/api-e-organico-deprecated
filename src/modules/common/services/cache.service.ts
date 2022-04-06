import { redisClient } from '@src/server/config';
import { REDIS_PX_MODE, REDIS_EXPIRATION_TIME_PASSWORD } from '@src/server/settings';
import { CacheDTO } from '../dtos';

type HasAndDelResponse = 1 | 0;

export class CacheService {
  constructor(private readonly cache = redisClient) {}

  private toSet(payload: CacheDTO): string {
    return JSON.stringify(payload);
  }

  private toGet<T>(payload: string): T {
    return JSON.parse(payload);
  }

  public del(...keys: string[]): Promise<HasAndDelResponse> {
    return this.cache.del(keys) as Promise<HasAndDelResponse>;
  }

  public set(key: string, payload: CacheDTO): Promise<'OK' | null> {
    return this.cache.set(key, this.toSet(payload), REDIS_PX_MODE, REDIS_EXPIRATION_TIME_PASSWORD);
  }

  public async get<T = CacheDTO>(key: string): Promise<T | undefined> {
    const cache = await this.cache.get(key);

    if (!cache) return;

    return this.toGet<T>(cache);
  }

  public has(key: string): Promise<HasAndDelResponse> {
    return this.cache.exists(key) as Promise<HasAndDelResponse>;
  }

  public async update(key: string, payload: CacheDTO): Promise<'OK' | null> {
    await this.del(key);

    return this.set(key, payload);
  }
}
