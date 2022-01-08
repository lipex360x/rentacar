import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserProfileService from './UserProfile.service'

export default class UserProfileController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const service = container.resolve(UserProfileService)

    const serviceResponse = await service.execute({ user_id })

    return response.json(serviceResponse)
  }
}
