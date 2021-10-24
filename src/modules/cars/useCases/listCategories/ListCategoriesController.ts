import { Request, Response } from 'express'
import { ListCategoriesService } from './ListCategoriesService'

class ListCategoriesController {
  constructor (private service:ListCategoriesService) {}
  handle (request: Request, response: Response): Response {
    const listCategories = this.service.execute()

    return response.json(listCategories)
  }
}

export { ListCategoriesController }
