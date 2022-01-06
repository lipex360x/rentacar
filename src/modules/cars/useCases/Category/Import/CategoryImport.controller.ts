import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CategoryImportService from './CategoryImport.service'

class CategoryImportController {
  async handle (request:Request, response:Response): Promise<Response> {
    const { file } = request

    const service = container.resolve(CategoryImportService)

    await service.execute({ file })

    return response.status(201).send()
  }
}

export default CategoryImportController
