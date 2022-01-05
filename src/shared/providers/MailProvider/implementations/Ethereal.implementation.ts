import { inject, injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import IMailTemplate from '@shared/providers/MailTemplateProvider/interface/IMailTemplate.interface'
import IMail, { SendMailProps } from '../interface/IMail.interface'

@injectable()
export default class EtherealProvider implements IMail {
  private client: Transporter

  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplate
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    }).catch(err => console.error(err))
  }

  async sendMail ({ to, from, subject, templateData }: SendMailProps): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || `'${process.env.PROJECT_NAME}'`,
        address: from?.email || `'${process.env.PROJECT_MAIL}'`
      },

      to: {
        name: to.name,
        address: to.email
      },

      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('\n MailSent. URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
