import { Request, Response } from 'express'
import { SpecificationListService } from './SpecificationListService'

class SpecificationListController {
  constructor (private service:SpecificationListService) {}

  handle (request: Request, response: Response): Response {
    const listSpecifications = this.service.execute()

    return response.json(listSpecifications)
  }
}

export { SpecificationListController }
