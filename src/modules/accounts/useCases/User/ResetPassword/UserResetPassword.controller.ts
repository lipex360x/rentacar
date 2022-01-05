import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserResetPasswordService from './UserResetPassword.service'

export default class UserResetPasswordController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const service = container.resolve(UserResetPasswordService)

    const serviceResponse = await service.execute({ token, password })

    return response.json(serviceResponse)
  }
}
