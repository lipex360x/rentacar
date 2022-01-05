import { container } from 'tsyringe'

import INotifications from '@modules/notifications/repositories/interfaces/INotifications.interface'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/Notifications.repository'

container.registerSingleton<INotifications>(
  'NotificationsRepository',
  NotificationsRepository
)

export default container
