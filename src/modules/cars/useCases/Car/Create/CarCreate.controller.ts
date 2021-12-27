import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CarCreateService from './CarCreate.service'

export default class CarCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(CarCreateService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
