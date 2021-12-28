import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CarListService from './CarList.service'

export default class CarListController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { brand, model, category_id } = request.query

    const service = container.resolve(CarListService)

    const serviceResponse = await service.execute({
      brand: brand as string,
      model: model as string,
      category_id: category_id as string
    })

    return response.json(serviceResponse)
  }
}
