// snippet: controllerTemplate
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/accounts/useCases/User/Create/UserCreateService'

export default class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license, isAdmin } = request.body

    const service = container.resolve(CreateUserService)

    const createUserService = await service.execute({ name, email, password, driver_license, isAdmin })

    return response.json(createUserService)
  }
}
