import { NotificationAttributes } from '@modules/notifications/infra/mongoose/schemas/Notification.schema'

export interface CreateProps {
  content: string
  user_id: string
}

export interface FindByIdProps {
  id: any
}

export interface UpdateProps {
  notification: NotificationAttributes
}

export interface DeleteProps {
  id: any
}

export default interface INotitications {
  create(data: CreateProps): Promise<NotificationAttributes>
  findAll(): Promise<NotificationAttributes[]>
  findById(data: FindByIdProps): Promise<NotificationAttributes>
  update(data: UpdateProps): Promise<NotificationAttributes>
  delete(data: DeleteProps): Promise<NotificationAttributes>
}
