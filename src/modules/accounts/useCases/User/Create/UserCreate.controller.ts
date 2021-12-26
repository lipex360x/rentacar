// snippet: controllerTemplate
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UserCreateService from './UserCreate.service'

export default class UserCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license, isAdmin } = request.body

    const service = container.resolve(UserCreateService)

    const userCreateService = await service.execute({ name, email, password, driver_license, isAdmin })

    return response.json(userCreateService)
  }
}
