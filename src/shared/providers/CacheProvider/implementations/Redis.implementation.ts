import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@shared/config/cache'

import ICache, { CreateProps, DeleteProps, FindByKeyProps } from '../interface/ICache.interface'

export default class RedisProvider implements ICache {
  private client: RedisClient

  constructor () {
    this.client = new Redis(cacheConfig.config.redis)
  }

  async create ({ key, value }: CreateProps): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  async findByKey ({ key }: FindByKeyProps): Promise<string> {
    const data = await this.client.get(key)
    return data
  }

  async delete (data: DeleteProps): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
