import { Router } from 'express'

const categoriesRoutes = Router()

categoriesRoutes.get('/', (request, response) => {
  return response.send('categories get')
})

categoriesRoutes.post('/', (request, response) => {
  return response.send('categories post')
})

export { categoriesRoutes }
