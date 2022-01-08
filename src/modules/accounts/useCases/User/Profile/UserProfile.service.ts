import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import UserMap from '@modules/accounts/mapper/User.map'

interface Request {
  user_id: string
}

@injectable()
export default class UserProfileService {
  constructor (
    @inject('UsersRepository')
    private repository: IUsers
  ) {}

  async execute ({ user_id }: Request): Promise<UserMap> {
    const user = await this.repository.findById({ id: user_id })

    if (!user) throw new AppError('User not found')

    return UserMap.response(user)
  }
}
