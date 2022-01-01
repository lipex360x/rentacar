import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RentailCreateService from './RentailCreate.service'

export default class RentailCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(RentailCreateService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
