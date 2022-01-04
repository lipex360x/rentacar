import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserTokenService from './UserToken.service'

export default class UserTokenController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(UserTokenService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
