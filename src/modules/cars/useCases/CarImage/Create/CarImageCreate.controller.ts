import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CarImageCreateService from './CarImageCreate.service'

interface IFilesProps {
  filename: string
}

export default class CarImageCreateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params
    const imagesFiles = request.files as IFilesProps[]

    const service = container.resolve(CarImageCreateService)

    const images = imagesFiles.map(file => file.filename)

    await service.execute({ car_id, images })

    return response.status(201).send()
  }
}
