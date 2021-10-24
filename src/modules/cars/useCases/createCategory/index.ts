import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CreateCategoryServices } from './CreateCategoryService'
import { CreateCategoryController } from './CreateCategoryController'

const repository = new CategoriesRepository()

const createCategoryService = new CreateCategoryServices(repository)

const createCategoryRepository = new CreateCategoryController(createCategoryService)

export { createCategoryService, createCategoryRepository }
