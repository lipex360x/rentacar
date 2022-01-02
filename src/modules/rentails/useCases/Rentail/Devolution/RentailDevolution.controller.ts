import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RentailDevolutionService from './RentailDevolution.service'

export default class RentailDevolutionController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const service = container.resolve(RentailDevolutionService)

    const serviceResponse = await service.execute({ id })

    return response.json(serviceResponse)
  }
}
