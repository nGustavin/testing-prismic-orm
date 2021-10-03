import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UserController } from '../modules/user/useCases/userCRUD/controllers/UserController'

const userController = new UserController()

export const userRoutes = Router()

userRoutes.use(ensureAuthenticated)

userRoutes.post('/new', userController.store)

userRoutes.get('/', userController.all)

userRoutes.delete('/delete/:id', userController.delete)

userRoutes.get('/user/:id', userController.one)
