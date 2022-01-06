import { getMongoRepository, MongoRepository } from 'typeorm'

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification.schema'
import INotifications, { CreateProps, DeleteProps, FindByIdProps, UpdateProps } from '@modules/notifications/repositories/interfaces/INotifications.interface'

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

  async findById ({ id }: FindByIdProps): Promise<Notification> {
    return this.repository.findOne(id)
  }

  async update ({ notification }: UpdateProps): Promise<Notification> {
    let findNotification = await this.repository.findOne(notification.id)

    findNotification = { ...notification }

    await this.repository.save(findNotification)

    return findNotification
  }

  async delete ({ id }: DeleteProps): Promise<Notification> {
    const notification = await this.repository.findOne({ id })

    await this.repository.delete(id)

    return notification
  }
}
