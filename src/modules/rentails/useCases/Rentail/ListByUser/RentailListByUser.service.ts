import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Rentail from '@modules/rentails/infra/typeorm/entities/Rentail.entity'
import IRentails from '@modules/rentails/repositories/interfaces/IRentails.interface'
import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import ICache from '@shared/providers/CacheProvider/interface/ICache.interface'

interface Request {
  user_id: string
}

@injectable()
export default class RentailListByUserService {
  constructor (
    @inject('CacheProvider')
    private cacheProvider: ICache,

    @inject('RentailsRepository')
    private repository: IRentails,

    @inject('UsersRepository')
    private usersRepository: IUsers
  ) {}

  async execute ({ user_id }: Request): Promise<Rentail[]> {
    const user = await this.usersRepository.findById({ id: user_id })

    if (!user) throw new AppError('User not found')

    const rentalsFromUser = await this.repository.findByUserId({ user_id })

    // await this.cacheProvider.create({ key: 'ashuasua', value: 'lksdflskd' })
    const cache = await this.cacheProvider.findByKey({ key: 'ashuasua' })
    console.log(cache)

    return rentalsFromUser
  }
}
