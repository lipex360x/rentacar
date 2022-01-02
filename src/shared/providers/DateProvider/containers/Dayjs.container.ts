import { container } from 'tsyringe'

import IDateProvider from '../interface/IDateProvider'
import Dayjs from '../implementations/Dayjs'

container.registerSingleton<IDateProvider>(
  'DateProvider',
  Dayjs
)

export default container
