import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/accounts/useCases/User/UpdateUserAvatar/UpdateUserAvatar.service'

export default class UpdateUserAvatar {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const avatar_file = request.file.filename

    const service = container.resolve(UpdateUserAvatarService)

    const serviceResponse = await service.execute({ id, avatar_file })

    return response.json(serviceResponse).status(204)
  }
}
