import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserRefreshTokenService from './UserRefreshToken.service'

export default class UserRefreshTokenController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(UserRefreshTokenService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
