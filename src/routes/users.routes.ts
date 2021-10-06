import { Router } from 'express'
import { UserAvatarController } from '../modules/user/useCases/addUserAvatar/controllers/UserAvatarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UserController } from '../modules/user/useCases/userCRUD/controllers/UserController'
import uploadConfig from '../config/upload'
import multer from 'multer'

const userController = new UserController()
const userAvatarController = new UserAvatarController()

export const userRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

userRoutes.post('/new', userController.store)

userRoutes.get('/', ensureAuthenticated, userController.all)

userRoutes.delete('/delete/:id', ensureAuthenticated, userController.delete)

userRoutes.get('/user/:id', ensureAuthenticated, userController.one)

userRoutes.patch(
  '/user/:id/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  userAvatarController.add
)

userRoutes.patch(
  '/user/:id/edit',
  ensureAuthenticated,
  userController.update
)
