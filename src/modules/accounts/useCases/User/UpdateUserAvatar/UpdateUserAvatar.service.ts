import { inject, injectable } from 'tsyringe'

import IUserRepository from '@modules/accounts/repositories/interfaces/IUserRepository'

import { deleteFile } from '@shared/utils/multerFiles'

interface Request {
  id: string
  avatar_file: string
}

interface Response {
  avatar_file: string
  user_name: string,
}

@injectable()
export default class UpdateUserAvatarService {
  constructor (
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  async execute ({ id, avatar_file }: Request): Promise<Response> {
    const user = await this.repository.findById({ id })

    await deleteFile({ fileName: `./tmp/avatar/${user.avatar}` })

    user.avatar = avatar_file

    await this.repository.create(user)

    const response = {
      avatar_file,
      user_name: user.name
    }

    return response
  }
}
