import ICache, { CreateProps, FindByKeyProps, DeleteByPrefixProps, DeleteKeyProps } from '../interface/ICache.interface'

interface ICacheProps {
  [key: string]: string
}

export default class FakeCacheProvider implements ICache {
  private repository:ICacheProps [] = []

  async create ({ key, value }: CreateProps): Promise<void> {
    this.repository[key] = value
  }

  async findByKey<T> ({ key }: FindByKeyProps): Promise<T> {
    return this.repository[key] as T
  }

  async deleteByPrefix ({ prefix }: DeleteByPrefixProps): Promise<void> {
    const keys = Object.keys(this.repository).filter(key => key.startsWith(`${prefix}:`))

    keys.forEach(key => {
      delete this.repository[key]
    })
  }

  async deleteKey ({ key }: DeleteKeyProps): Promise<void> {
    delete this.repository[key]
  }
}
