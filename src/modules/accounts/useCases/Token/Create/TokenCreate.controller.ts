import { Request, Response } from 'express'
import { container } from 'tsyringe'

import TokenCreateService from './TokenCreate.service'

export default class TokenCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { props } = request.body

    const service = container.resolve(TokenCreateService)

    const serviceResponse = await service.execute({ props })

    return response.json(serviceResponse)
  }
}
