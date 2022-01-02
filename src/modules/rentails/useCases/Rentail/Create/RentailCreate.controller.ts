import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RentailCreateService from './RentailCreate.service'

export default class RentailCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { car_id, expected_return_date } = request.body

    const service = container.resolve(RentailCreateService)

    const serviceResponse = await service.execute({ user_id, car_id, expected_return_date })

    return response.json(serviceResponse)
  }
}
