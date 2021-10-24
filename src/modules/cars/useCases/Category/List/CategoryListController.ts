import { Request, Response } from 'express'
import { CategoryListService } from './CategoryListService'

class CategoryListController {
  constructor (private service:CategoryListService) {}

  handle (request: Request, response: Response): Response {
    const categoriesList = this.service.execute()

    return response.json(categoriesList)
  }
}

export { CategoryListController }
