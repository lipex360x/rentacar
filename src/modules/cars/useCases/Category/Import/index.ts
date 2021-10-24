import { CategoryImportService } from './CategoryImportService'
import { CategoryImportController } from './CategoryImportController'
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'

const categoryRepository = CategoriesRepository.getInstance()

const categoryImportService = new CategoryImportService(categoryRepository)

const categoryImportController = new CategoryImportController(categoryImportService)

export { categoryImportController }
