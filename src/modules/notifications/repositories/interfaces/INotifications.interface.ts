import Notification from '@modules/notifications/infra/typeorm/schemas/Notification.schema'

export interface CreateProps {
  content: string
  user_id: string
}

export interface FindByIdProps {
  id: any
}

export interface UpdateProps {
  notification: Notification
}

export interface DeleteProps {
  id: any
}

export default interface INotitications {
  create(data: CreateProps): Promise<Notification>
  findAll(): Promise<Notification[]>
  findById(data: FindByIdProps): Promise<Notification>
  update(data: UpdateProps): Promise<Notification>
  delete(data: DeleteProps): Promise<Notification>
}
