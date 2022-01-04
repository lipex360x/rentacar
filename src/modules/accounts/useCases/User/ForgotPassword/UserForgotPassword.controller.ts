import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserForgotPasswordService from './UserForgotPassword.service'

export default class UserForgotPasswordController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const service = container.resolve(UserForgotPasswordService)

    const serviceResponse = await service.execute({ email })

    return response.json(serviceResponse)
  }
}
