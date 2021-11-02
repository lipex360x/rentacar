import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { SpecificationCreateService } from './SpecificationCreateService'

class SpecificationCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const service = container.resolve(SpecificationCreateService)

    await service.execute({ name, description })

    return response.status(201).send()
  }
}

export { SpecificationCreateController }
