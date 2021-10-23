import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()
const repository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  repository.create({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const getCategories = repository.list()

  return response.json(getCategories)
})

export { categoriesRoutes }
