import { Router } from 'express'
import swagger from 'swagger-ui-express'

import { categoriesRoutes } from '@modules/cars/infra/routes/categories.routes'
import { specificationsRoutes } from '@modules/cars/infra/routes/specifications.routes'

import userRoutes from '@modules/accounts/infra/http/routes/user.routes'
import authRoutes from '@modules/accounts/infra/http/routes/auth.routes'

import swaggerFile from './swagger.json'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', userRoutes)
routes.use('/auth', authRoutes)

routes.use('/api-docs', swagger.serve, swagger.setup(swaggerFile))

export { routes }
