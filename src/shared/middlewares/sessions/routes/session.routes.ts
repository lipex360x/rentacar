import { Router } from 'express'

import SessionController from '../useCases/Session.controller'

const router = Router()

const controllerInstance = new SessionController()

router.post('/', controllerInstance.handle)

export default router
