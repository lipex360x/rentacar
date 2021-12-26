import { Router } from 'express'
import multer from 'multer'

import CreateUser from '@modules/accounts/useCases/User/Create/UserCreate.controller'
import UpdateUserAvatar from '@modules/accounts/useCases/User/UpdateUserAvatar/UpdateUserAvatar.controller'
import sessionMiddleware from '@shared/middlewares/sessions'

import { uploadFile } from '@shared/utils/multerFiles'

const router = Router()

const createUserController = new CreateUser()
const updateUserAvatarController = new UpdateUserAvatar()

const upload = multer(uploadFile({ folder: './tmp/avatar' }))

router.post('/', createUserController.handle)

router.use(sessionMiddleware)
router.patch('/avatar', upload.single('avatar'), updateUserAvatarController.handle)

export default router
