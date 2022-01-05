import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'

interface Request {
  user_id: string
}

@injectable()
export default class RentailListByUserService {
  constructor (
    @inject('RentailsRepository')
    private repository: IRentails,

    @inject('UsersRepository')
    private usersRepository: IUsers
  ) {}

  async execute ({ user_id }: Request): Promise<Rentail[]> {
    const user = await this.usersRepository.findById({ id: user_id })

    if (!user) throw new AppError('User not found')

    return this.repository.findByUserId({ user_id })
  }
}
