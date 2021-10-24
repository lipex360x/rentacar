import { Request, Response } from 'express'

import { CategoryCreateService } from '@modules/cars/useCases/Category/Create/CategoryCreateService'

class CategoryCreateController {
  constructor (private service:CategoryCreateService) {}

  handle (request:Request, response: Response): Response {
    const { name, description } = request.body

    this.service.execute({ name, description })

    return response.status(201).send()
  }
}

export { CategoryCreateController }
