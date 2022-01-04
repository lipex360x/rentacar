import { container } from 'tsyringe'

import IMail from '../interface/IMail.interface'
import EtherealProvider from '../implementations/Ethereal.implementation'

container.registerInstance<IMail>(
  'MailProvider',
  container.resolve(EtherealProvider)
)

export default container
