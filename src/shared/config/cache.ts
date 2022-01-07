import { RedisOptions } from 'ioredis'

interface CacheProps {
  driver: 'redis'
  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: undefined,

      enableReadyCheck: true,
      lazyConnect: true,
      enableOfflineQueue: true,
      failoverDetector: true,
      retryStrategy: () => 2,
      reconnectOnError: (err) => {
        if (err.message.includes('READONLY')) {
          console.warn({ err }, 'readonly event triggered')
          return 2
        }
      }
    }
  }
} as CacheProps
