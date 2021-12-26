import { container } from 'tsyringe'
import { Request, Response } from 'express'

import CategoryCreateService from './CategoryCreate.service'

class CategoryCreateController {
  async handle (request:Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const service = container.resolve(CategoryCreateService)

    await service.execute({ name, description })

    return response.status(201).send()
  }
}

export default CategoryCreateController
