import Notification, { NotificationAttributes } from '@modules/notifications/infra/mongoose/schemas/Notification.schema'
import INotifications, { CreateProps, FindByIdProps, UpdateProps, DeleteProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

export default class NotificationsRepository implements INotifications {
  async create ({ content, user_id }: CreateProps): Promise<NotificationAttributes> {
    return Notification.create({
      user_id,
      content
    })
  }

  async findAll (): Promise<NotificationAttributes[]> {
    return Notification.find()
  }

  async findById ({ id }: FindByIdProps): Promise<NotificationAttributes> {
    return Notification.findOne({ _id: { $ne: id } })
  }

  async update ({ notification }: UpdateProps): Promise<NotificationAttributes> {
    const id = notification._id
    return Notification.findByIdAndUpdate(id, notification, { new: true })
  }

  async delete ({ id }: DeleteProps): Promise<NotificationAttributes> {
    return Notification.findByIdAndDelete(id)
  }
}
