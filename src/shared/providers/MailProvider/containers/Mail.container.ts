import { container } from 'tsyringe'

import IMailProvider from '../interface/IMail.interface'
import EtherealProvider from '../implementations/Ethereal.implementation'

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealProvider)
)

export default container
