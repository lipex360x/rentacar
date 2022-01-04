import { container } from 'tsyringe'

import IDate from '../interface/IDate.interface'
import DayjsProvider from '../implementations/Dayjs.implementation'

container.registerSingleton<IDate>(
  'DateProvider',
  DayjsProvider
)

export default container
