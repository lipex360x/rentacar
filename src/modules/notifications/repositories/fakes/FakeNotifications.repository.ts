import Notification from '@modules/notifications/infra/typeorm/schemas/Notification.schema'
import INotifications, { CreateProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

export default class FakeNotificationsRepository implements INotifications {
  private repository: Notification[] = []

  async create ({ content, user_id }: CreateProps): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, {
      ...notification,
      content,
      user_id,
      read: false
    })

    this.repository.push(notification)

    return notification
  }

  async findAll (): Promise<Notification[]> {
    return this.repository
  }
}
