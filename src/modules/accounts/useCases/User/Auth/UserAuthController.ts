import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserAuthService from './UserAuthService'

export default class UserAuthController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const service = container.resolve(UserAuthService)

    const serviceResponse = await service.execute({ email, password })

    return response.json(serviceResponse)
  }
}
