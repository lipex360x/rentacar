import { container } from 'tsyringe'
import { Request, Response } from 'express'
import SpecificationListService from './SpecificationListService'

class SpecificationListController {
  async handle (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(SpecificationListService)

    const listSpecifications = await service.execute()

    return response.json(listSpecifications)
  }
}

export default SpecificationListController
