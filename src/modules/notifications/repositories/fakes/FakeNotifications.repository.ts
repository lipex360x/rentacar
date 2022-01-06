import Notification, { NotificationAttributes } from '@modules/notifications/infra/mongoose/schemas/Notification.schema'
import INotifications, { CreateProps, FindByIdProps, UpdateProps, DeleteProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

export default class FakeNotificationsRepository implements INotifications {
  private repository: NotificationAttributes[] = []

  async create ({ content, user_id }: CreateProps): Promise<NotificationAttributes> {
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

  async findAll (): Promise<NotificationAttributes[]> {
    return this.repository
  }

  async findById ({ id }: FindByIdProps): Promise<NotificationAttributes> {
    return this.repository.find(notification => notification._id === id)
  }

  async update ({ notification }: UpdateProps): Promise<NotificationAttributes> {
    const getIndex = this.repository.findIndex(getNotification => getNotification._id === notification._id)

    this.repository[getIndex] = notification

    return notification
  }

  async delete ({ id }: DeleteProps): Promise<NotificationAttributes> {
    const notification = this.repository.find(repo => repo._id === id)

    this.repository = this.repository.filter(repo => repo._id !== id)

    return notification
  }
}
