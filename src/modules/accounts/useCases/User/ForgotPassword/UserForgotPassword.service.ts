import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import { v4 as uuid } from 'uuid'
import { resolve } from 'path'

import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IMail from '@shared/providers/MailProvider/interface/IMail.interface'
import IDate from '@shared/providers/DateProvider/interface/IDate.interface'

interface Request {
  email: string
}

@injectable()
export default class UserForgotPasswordService {
  constructor (
    @inject('DateProvider')
    private dateProvider: IDate,

    @inject('MailProvider')
    private mailProvider: IMail,

    @inject('TokensRepository')
    private tokensRepository: ITokens,

    @inject('UsersRepository')
    private userRepository: IUsers
  ) {}

  async execute ({ email }: Request): Promise<string> {
    const user = await this.userRepository.findByEmail({ email })

    if (!user) throw new AppError('User not found!')

    const getToken = await this.tokensRepository.findByUserId({ user_id: user.id })

    if (getToken) await this.tokensRepository.delete({ id: getToken.id })

    const { token } = await this.tokensRepository.create({
      token: uuid(),
      user_id: user.id,
      type: 'forgotPassword',
      expire_date: this.dateProvider.addTime({ time: 3, unit: 'hour' })
    })

    const mailTemplate = resolve(__dirname, 'MailTemplate.hbs')

    await this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: 'Recovery Password',
      templateData: {
        file: mailTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/password/reset/${token}`
        }
      }
    })

    return token
  }
}
