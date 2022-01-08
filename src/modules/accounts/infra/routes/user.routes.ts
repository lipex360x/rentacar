import { Router } from 'express'
import multer from 'multer'

import CreateUser from '@modules/accounts/useCases/User/Create/UserCreate.controller'
import UserUpdateAvatarController from '@modules/accounts/useCases/User/UpdateAvatar/UserUpdateAvatar.controller'
import UserProfileController from '@modules/accounts/useCases/User/Profile/UserProfile.controller'
import sessionMiddleware from '@shared/middlewares/sessions'

import { multerConfig } from '@shared/config/files'

const router = Router()

const createUserController = new CreateUser()
const userUpdateAvatarController = new UserUpdateAvatarController()
const userProfileController = new UserProfileController()

const upload = multer(multerConfig())

router.post('/', createUserController.handle)

router.use(sessionMiddleware)
router.patch('/avatar', upload.single('avatar'), userUpdateAvatarController.handle)
router.get('/profile', userProfileController.handle)

export default router
