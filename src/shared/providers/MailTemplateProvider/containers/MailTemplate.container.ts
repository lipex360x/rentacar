import { container } from 'tsyringe'

import IMailTemplate from '../interface/IMailTemplate.interface'
import HandlebarsProvider from '../implementations/Handlebars.implementation'

container.registerSingleton<IMailTemplate>(
  'MailTemplateProvider',
  HandlebarsProvider
)

export default container
