import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { CreateCategoryServices } from '@modules/cars/services/CreateCategoryServices'
import { Router } from 'express'

const categoriesRoutes = Router()

const repository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const service = new CreateCategoryServices(repository)

  service.execute({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const getCategories = repository.list()

  return response.json(getCategories)
})

export { categoriesRoutes }
