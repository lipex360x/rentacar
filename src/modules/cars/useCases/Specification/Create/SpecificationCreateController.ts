import { Request, Response } from 'express'
import { SpecificationCreateService } from './SpecificationCreateService'

class SpecificationCreateController {
  constructor (private service:SpecificationCreateService) {}

  handle (request: Request, response: Response): Response {
    const { name, description } = request.body

    this.service.execute({ name, description })

    return response.status(201).send()
  }
}

export { SpecificationCreateController }
