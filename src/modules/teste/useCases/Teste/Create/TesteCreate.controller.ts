import { Request, Response } from 'express'
import { container } from 'tsyringe'

import TesteCreateService from './TesteCreate.service'

export default class TesteCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(TesteCreateService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
