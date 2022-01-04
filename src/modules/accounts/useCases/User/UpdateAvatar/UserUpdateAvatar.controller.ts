import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserUpdateAvatarService from '@modules/accounts/useCases/User/UpdateAvatar/UserUpdateAvatar.service'

export default class UserUpdateAvatarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const avatar_file = request.file.filename

    const service = container.resolve(UserUpdateAvatarService)

    const serviceResponse = await service.execute({ user_id, avatar_file })

    return response.json(serviceResponse).status(204)
  }
}
