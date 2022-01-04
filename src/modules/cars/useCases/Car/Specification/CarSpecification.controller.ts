import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CarSpecificationService from './CarSpecification.service'

export default class CarSpecificationController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params
    const { specifications_id } = request.body

    const service = container.resolve(CarSpecificationService)

    const serviceResponse = await service.execute({ car_id, specifications_id })

    return response.json(serviceResponse)
  }
}
