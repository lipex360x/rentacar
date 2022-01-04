export interface SendMailProps {
  to: string
  subject: string
  body: string
}

export default interface IMailProvider {
  sendMail(data: SendMailProps): Promise<void>
}
