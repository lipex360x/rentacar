import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserRefreshTokenService from './UserRefreshToken.service'

export default class UserRefreshTokenController {
  async handle (request: Request, response: Response): Promise<Response> {
    const token = request.body.token || request.headers['x-access-token'] || request.query.token

    const service = container.resolve(UserRefreshTokenService)

    const serviceResponse = await service.execute({ token })

    return response.json(serviceResponse)
  }
}
