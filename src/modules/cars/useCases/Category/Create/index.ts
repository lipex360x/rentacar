import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CategoryCreateService } from './CategoryCreateService'
import { CategoryCreateController } from './CategoryCreateController'

export default (): CategoryCreateController => {
  const categoryRepository = new CategoriesRepository()

  const categoryCreateService = new CategoryCreateService(categoryRepository)

  const categoryCreateController = new CategoryCreateController(categoryCreateService)

  return categoryCreateController
}
