import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'
import { SpecificationCreateService } from './SpecificationCreateService'
import { SpecificationCreateController } from './SpecificationCreateController'

const specificationRepository = SpecificationsRepository.getInstance()

const specificationCreateService = new SpecificationCreateService(specificationRepository)

const specificationCreateController = new SpecificationCreateController(specificationCreateService)

export { specificationCreateController }
