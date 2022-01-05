import { inject, injectable } from 'tsyringe'

import IUsers from '@modules/accounts/repositories/interfaces/IUsers.interface'
import IStorageProvider from '@shared/providers/StorageProvider/interface/IStorage.interface'
import AppError from '@shared/errors/AppError'

interface Request {
  user_id: string
  avatar_file: string
}

interface Response {
  avatar_file: string
  user_name: string,
}

@injectable()
export default class UserUpdateAvatarService {
  constructor (
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private repository: IUsers
  ) {}

  async execute ({ user_id, avatar_file }: Request): Promise<Response> {
    const user = await this.repository.findById({ id: user_id })

    if (!user) throw new AppError('User not found!')

    if (user.avatar) await this.storageProvider.deleteFile({ file: user.avatar })

    const fileName = await this.storageProvider.saveFile({ file: avatar_file })

    user.avatar = fileName

    await this.repository.create(user)

    const response = {
      avatar_file,
      user_name: user.name
    }

    return response
  }
}
