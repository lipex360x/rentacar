import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'
import IStorageProvider from '@shared/providers/StorageProvider/interface/IStorage.interface'

interface Request {
  user_id: string
  avatar_file: string
}

interface Response {
  avatar_file: string
  user_name: string,
}

@injectable()
export default class UpdateUserAvatarService {
  constructor (
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  async execute ({ user_id, avatar_file }: Request): Promise<Response> {
    const user = await this.repository.findById({ id: user_id })

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
