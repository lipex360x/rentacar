export interface SendMailProps {
  to: string
  subject: string
  body: string
}

export default interface IMail {
  sendMail(data: SendMailProps): Promise<void>
}
