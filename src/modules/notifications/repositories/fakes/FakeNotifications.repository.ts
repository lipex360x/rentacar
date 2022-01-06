import Notification, { NotificationDocument, NotificationAttributes } from '@modules/notifications/infra/mongoose/schemas/Notification.schema'
import INotifications, { CreateProps, FindByIdProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

export default class FakeNotificationsRepository implements INotifications {
  private repository: NotificationAttributes[] = []

  async create ({ content, user_id }: CreateProps): Promise<NotificationDocument> {
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
    return this.repository.find(notification => notification.id === id)
  }

  // async update ({ notification }: UpdateProps): Promise<Notification> {
  //   const getIndex = this.repository.findIndex(getNotification => getNotification.id === notification.id)

  //   this.repository[getIndex] = notification

  //   return notification
  // }

  // async delete ({ id }: DeleteProps): Promise<Notification> {
  //   const token = this.repository.find(repo => repo.id === id)

  //   this.repository = this.repository.filter(repo => repo.id !== id)

  //   return token
  // }
}
