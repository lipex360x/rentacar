import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import ITokens from '@modules/tokens/repositories/interfaces/ITokens.interface'
import IDate from '@shared/providers/DateProvider/interface/IDate.interface'
import IHash from '@shared/providers/HashProvider/interface/IHash.interface'

interface Request {
  token: string
  password: string
}

@injectable()
export default class UserResetPasswordService {
  private tokenExpireTime:number = 3

  constructor (
    @inject('DateProvider')
    private dateProvider: IDate,

    @inject('HashProvider')
    private hashProvider: IHash,

    @inject('TokensRepository')
    private tokensRepository: ITokens,

    @inject('UsersRepository')
    private repository: IUsers
  ) {}

  async execute ({ token, password }: Request): Promise<void> {
    const getToken = await this.tokensRepository.findByToken({ token })

    if (!getToken) throw new AppError('This token is invalid')

    const dateNow = this.dateProvider.dateNow()

    const tokenTime = this.dateProvider.compareDates({
      start_date: getToken.expire_date,
      end_date: dateNow,
      unit: 'hour'
    })

    if (tokenTime >= this.tokenExpireTime) throw new AppError('This token is invalid')

    const user = await this.repository.findById({ id: getToken.user_id })

    if (!user) throw new AppError('User not fould')

    user.password = await this.hashProvider.generateHash(password)

    await this.repository.update({ user })

    await this.tokensRepository.delete({ id: getToken.id })
  }
}
