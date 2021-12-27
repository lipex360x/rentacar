import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CarCreateService from './CarCreate.service'

export default class CarCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { brand, model, license_plate, description, daily_rate, fine_amount, category_id } = request.body

    const service = container.resolve(CarCreateService)

    const serviceResponse = await service.execute({ brand, model, license_plate, description, daily_rate, fine_amount, category_id })

    return response.json(serviceResponse)
  }
}
