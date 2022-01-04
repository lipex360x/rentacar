import IMail, { SendMailProps } from '../interface/IMail.interface'

interface MessageProps {
  to: string
  subject: string
  body: string
}

export default class FakeMailProvider implements IMail {
  private mail: MessageProps[] = []

  async sendMail ({ to, subject, body }: SendMailProps): Promise<void> {
    this.mail.push({
      to,
      subject,
      body
    })
  }
}
