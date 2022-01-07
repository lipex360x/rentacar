import { container } from 'tsyringe'

import ICache from '../interface/ICache.interface'
import RedisProvider from '../implementations/Redis.implementation'

container.registerSingleton<ICache>(
  'CacheProvider',
  RedisProvider
)

export default container
