import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from './UpdateUserAvatarService'

export default class UpdateUserAvatarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(UpdateUserAvatarService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
