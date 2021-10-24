import { Request, Response } from 'express'

import { CreateCategoryServices } from '@modules/cars/useCases/createCategory/CreateCategoryService'

class CreateCategoryController {
  constructor (private service:CreateCategoryServices) {}

  handle (request:Request, response: Response): Response {
    const { name, description } = request.body

    this.service.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateCategoryController }
