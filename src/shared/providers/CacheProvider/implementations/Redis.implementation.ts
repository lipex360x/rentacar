import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@shared/config/cache'

import ICache, { CreateProps, FindByKeyProps, DeleteByPrefixProps, DeleteKeyProps } from '../interface/ICache.interface'

export default class RedisProvider implements ICache {
  private client: RedisClient

  constructor () {
    this.client = new Redis(cacheConfig.config.redis)
  }

  async create ({ key, value }: CreateProps): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  async findByKey<T> ({ key }: FindByKeyProps): Promise<T> {
    const data = await this.client.get(key)

    return JSON.parse(data) as T
  }

  async deleteByPrefix ({ prefix }: DeleteByPrefixProps): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }

  async deleteKey ({ key }: DeleteKeyProps): Promise<void> {
    await this.client.del(key)
  }
}
