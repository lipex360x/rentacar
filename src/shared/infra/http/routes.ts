import { Router } from 'express'

import loginRoutes from '@modules/accounts/infra/routes/login.routes'

import categoriesRoutes from '@modules/cars/infra/routes/categories.routes'

import specificationsRoutes from '@modules/cars/infra/routes/specifications.routes'

import carsRoutes from '@modules/cars/infra/routes/cars.routes'

import userRoutes from '@modules/accounts/infra/routes/user.routes'

import rentailRoutes from '@modules/rentails/infra/routes/rentail.routes'

import passwordRotes from '@modules/accounts/infra/routes/password.routes'

const routes = Router()

routes.use('/login', loginRoutes)

routes.use('/cars', carsRoutes)

routes.use('/categories', categoriesRoutes)

routes.use('/specifications', specificationsRoutes)

routes.use('/users', userRoutes)

routes.use('/rentails', rentailRoutes)

routes.use('/password', passwordRotes)

export default routes
