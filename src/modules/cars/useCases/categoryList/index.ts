import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CategoryListService } from './CategoryListService'
import { CategoryListController } from './CategoryListController'

const categoryRepository = CategoriesRepository.getInstance()

const categoryListService = new CategoryListService(categoryRepository)

const categoryListController = new CategoryListController(categoryListService)

export { categoryListController }
