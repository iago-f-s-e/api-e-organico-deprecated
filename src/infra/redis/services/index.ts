import { redisConnection } from '../config';
import { CachePayload, HasAndDelResponse } from '../types';

export class RedisService {
  constructor(private readonly cache = redisConnection) {}

  private toSet(payload: CachePayload): string {
    const isString = typeof payload === 'string';

    if (isString) return payload;

    return JSON.stringify(payload);
  }

  private toGet<T>(payload: string): T {
    return JSON.parse(payload);
  }

  public del(...keys: string[]): Promise<HasAndDelResponse> {
    return this.cache.del(keys) as Promise<HasAndDelResponse>;
  }

  public set(key: string, payload: CachePayload): Promise<'OK' | null> {
    return this.cache.set(key, this.toSet(payload));
  }

  public async get<T = CachePayload>(key: string): Promise<T | undefined> {
    const cache = await this.cache.get(key);

    if (!cache) return;

    return this.toGet<T>(cache);
  }

  public has(key: string): Promise<HasAndDelResponse> {
    return this.cache.exists(key) as Promise<HasAndDelResponse>;
  }

  public async update(key: string, payload: CachePayload): Promise<'OK' | null> {
    await this.del(key);

    return this.set(key, payload);
  }
}
