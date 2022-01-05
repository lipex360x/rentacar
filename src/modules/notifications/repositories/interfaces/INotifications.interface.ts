import Notification from '@modules/notifications/infra/typeorm/schemas/Notification.schema'

export interface CreateProps {
  content: string
  user_id: string
}

export default interface INotitications {
  create(data: CreateProps): Promise<Notification>
  findAll(): Promise<Notification[]>
}
