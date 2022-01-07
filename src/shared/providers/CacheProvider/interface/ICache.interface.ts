export interface CreateProps {
  key: string
  value: any
}

export interface FindByKeyProps {
  key: string
}

export interface DeleteAllProps {
  key: string
}

export interface DeleteByPrefixProps {
  prefix: string
}

export default interface ICache {
  create(data: CreateProps): Promise<void>
  findByKey<T>(data: FindByKeyProps): Promise<T>
  deleteAll(data: DeleteAllProps): Promise<void>
  deleteByPrefix(data: DeleteByPrefixProps): Promise<void>
}
