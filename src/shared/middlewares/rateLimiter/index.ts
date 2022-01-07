import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import Redis from 'ioredis'

import AppError from '@shared/errors/AppError'
import cacheConfig from '@shared/config/cache'

const redisClient = new Redis(cacheConfig.config.redis)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
})

export default async function rateLimiter (request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
