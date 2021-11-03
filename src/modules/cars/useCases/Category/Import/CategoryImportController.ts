import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CategoryImportService } from './CategoryImportService'

class CategoryImportController {
  async handle (request:Request, response:Response): Promise<Response> {
    const { file } = request

    const service = container.resolve(CategoryImportService)

    await service.execute({ file })

    return response.status(201).send()
  }
}

export { CategoryImportController }
