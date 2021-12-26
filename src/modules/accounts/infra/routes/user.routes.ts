import { Router } from 'express'
import multer from 'multer'

import CreateUserController from '@modules/accounts/useCases/User/Create/UserCreateController'
import UpdateUserAvatarController from '@modules/accounts/useCases/User/UpdateUserAvatar/UpdateUserAvatarController'
import sessionMiddleware from '@shared/middlewares/sessions'

import { uploadFile as uploadConfig } from '@shared/utils/multerFiles'

const router = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const upload = multer(uploadConfig('./tmp/avatar'))

router.post('/', createUserController.handle)

router.use(sessionMiddleware)
router.patch('/avatar', upload.single('avatar'), updateUserAvatarController.handle)

export default router
