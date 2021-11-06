import { Router } from 'express'
import swagger from 'swagger-ui-express'

import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'

import swaggerFile from './swagger.json'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)

routes.get('/hello', (request, response) => {
  response.json({ message: 'Hello World' })
})

routes.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

export { routes }
