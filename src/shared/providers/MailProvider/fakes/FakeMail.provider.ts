import IMail, { SendMailProps } from '../interface/IMail.interface'

export default class FakeMailProvider implements IMail {
  private mail: SendMailProps[] = []

  async sendMail ({ to, from, subject, templateData }: SendMailProps): Promise<void> {
    this.mail.push({ to, from, subject, templateData })
  }
}
