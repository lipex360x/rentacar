import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CategoryListService from './CategoryList.service'

class CategoryListController {
  async handle (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(CategoryListService)

    const categoriesList = await service.execute()

    return response.json(categoriesList)
  }
}

export default CategoryListController
