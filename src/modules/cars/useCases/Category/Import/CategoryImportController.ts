import { Request, Response } from 'express'
import { CategoryImportService } from './CategoryImportService'

class CategoryImportController {
  constructor (private categoryImportService:CategoryImportService) {}

  async handle (request:Request, response:Response): Promise<Response> {
    const { file } = request

    const importFile = await this.categoryImportService.execute({ file })

    return response.json(importFile)
  }
}

export { CategoryImportController }
