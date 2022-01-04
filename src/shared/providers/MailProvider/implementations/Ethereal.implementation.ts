import nodemailer, { Transporter } from 'nodemailer'
import IMailProvider, { SendMailProps } from '../interface/IMail.interface'

class EtherealProvider implements IMailProvider {
  private client: Transporter

  constructor () {
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

  async sendMail ({ to, subject, body }: SendMailProps): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rentex <noreplay@rentex.com>',
      subject,
      text: body,
      html: body
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealProvider
