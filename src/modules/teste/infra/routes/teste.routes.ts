import { Router } from 'express'

import TesteCreateController from '@modules/teste/useCases/Teste/Create/TesteCreate.controller'

const router = Router()

const testeCreateController = new TesteCreateController()

router.post('/', testeCreateController.handle)

export default router
