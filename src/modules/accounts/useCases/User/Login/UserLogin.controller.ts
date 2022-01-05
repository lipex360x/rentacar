import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserLoginService from './UserLogin.service'

export default class SessionController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const service = container.resolve(UserLoginService)

    const serviceResponse = await service.execute({ email, password })

    return response.json(serviceResponse)
  }
}
