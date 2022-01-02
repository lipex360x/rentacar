import { container } from 'tsyringe'

import IDateProvider from '../interface/IDate.interface'
import DayjsProvider from '../implementations/Dayjs.implementation'

container.registerSingleton<IDateProvider>(
  'DateProvider',
  DayjsProvider
)

export default container
