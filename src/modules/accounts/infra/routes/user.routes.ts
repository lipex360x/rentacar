import { Router } from 'express'
import multer from 'multer'

import CreateUser from '@modules/accounts/useCases/User/Create/UserCreate.controller'
import UpdateUserAvatar from '@modules/accounts/useCases/User/UpdateUserAvatar/UpdateUserAvatar.controller'
import sessionMiddleware from '@shared/middlewares/sessions'

import { multerConfig } from '@shared/config'
import UserForgotPasswordController from '@modules/accounts/useCases/User/ForgotPassword/UserForgotPassword.controller'

const router = Router()

const createUserController = new CreateUser()
const updateUserAvatarController = new UpdateUserAvatar()
const forgotPasswordController = new UserForgotPasswordController()

const upload = multer(multerConfig())

router.post('/', createUserController.handle)
router.post('/forgot', forgotPasswordController.handle)

router.use(sessionMiddleware)
router.patch('/avatar', upload.single('avatar'), updateUserAvatarController.handle)

export default router
