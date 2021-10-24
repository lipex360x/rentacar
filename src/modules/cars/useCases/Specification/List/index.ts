import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'
import { SpecificationListService } from './SpecificationListService'
import { SpecificationListController } from './SpecificationListController'

const specificationRepository = SpecificationsRepository.getInstance()

const specificationList = new SpecificationListService(specificationRepository)

const specificationListController = new SpecificationListController(specificationList)

export { specificationListController }
