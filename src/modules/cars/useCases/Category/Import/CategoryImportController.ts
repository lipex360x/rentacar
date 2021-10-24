import { Request, Response } from 'express'
import { CategoryImportService } from './CategoryImportService'

class CategoryImportController {
  constructor (private categoryImportService:CategoryImportService) {}

  handle (request:Request, response:Response): Response {
    const { file } = request

    this.categoryImportService.execute({ file })

    return response.send()
  }
}

export { CategoryImportController }
