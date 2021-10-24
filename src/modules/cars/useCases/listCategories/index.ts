import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ListCategoriesService } from './ListCategoriesService'
import { ListCategoriesController } from './ListCategoriesController'

const repository = CategoriesRepository.getInstance()

const listCategoriesService = new ListCategoriesService(repository)

const listCategoriesController = new ListCategoriesController(listCategoriesService)

export { listCategoriesController }
