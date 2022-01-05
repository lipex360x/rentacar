import { getMongoRepository, MongoRepository } from 'typeorm'

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification.schema'
import INotifications, { CreateProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

export default class NotificationsRepository implements INotifications {
  private repository: MongoRepository<Notification>

  constructor () {
    this.repository = getMongoRepository(Notification, 'mongo')
  }

  async create ({ content, user_id }: CreateProps): Promise<Notification> {
    const notification = this.repository.create({ content, user_id, read: false })

    await this.repository.save(notification)

    return notification
  }

  async findAll (): Promise<Notification[]> {
    return this.repository.find()
  }
}
