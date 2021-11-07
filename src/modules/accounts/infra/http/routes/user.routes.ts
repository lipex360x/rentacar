// snippet: routerTemplate
import { Router } from 'express'

import CreateUserController from '@modules/accounts/useCases/User/Create/UserCreateController'

const router = Router()

const createUserController = new CreateUserController()

router.post('/', createUserController.handle)

export default router
