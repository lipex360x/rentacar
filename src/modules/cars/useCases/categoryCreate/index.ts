import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CategoryCreateService } from './CategoryCreateService'
import { CategoryCreateController } from './CategoryCreateController'

const categoryRepository = CategoriesRepository.getInstance()

const categoryCreateService = new CategoryCreateService(categoryRepository)

const categoryCreateController = new CategoryCreateController(categoryCreateService)

export { categoryCreateController }
