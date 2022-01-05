import { ParseMailProps } from '@shared/providers/MailTemplateProvider/interface/IMailTemplate.interface'

interface MailContactProps {
  name: string
  email: string
}

export interface SendMailProps {
  to: MailContactProps
  from ?: MailContactProps
  subject: string
  templateData: ParseMailProps
}

export default interface IMail {
  sendMail(data: SendMailProps): Promise<void>
}
