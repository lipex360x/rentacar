import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RentailListByUserService from './RentailListByUser.service'

export default class RentailListByUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const service = container.resolve(RentailListByUserService)

    const serviceResponse = await service.execute({ user_id })

    return response.json(serviceResponse)
  }
}
