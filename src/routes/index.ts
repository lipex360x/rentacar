import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)

routes.get('/hello', (request, response) => {
  response.json({ message: 'Hello World' })
})

export { routes }
