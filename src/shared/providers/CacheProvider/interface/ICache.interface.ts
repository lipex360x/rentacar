
export interface CreateProps {
  key: string
  value: string
}

export interface DeleteProps {
  key: string
}

export interface FindByKeyProps {
  key: string
}

export default interface ICache {
  create(data: CreateProps): Promise<void>
  findByKey(data: FindByKeyProps): Promise<string>
  delete(data: DeleteProps): Promise<void>
}
