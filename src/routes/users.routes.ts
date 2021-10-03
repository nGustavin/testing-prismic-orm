import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UserController } from '../modules/user/useCases/userCRUD/controllers/UserController'

const userController = new UserController()

export const userRoutes = Router()

userRoutes.post('/new', userController.store)

userRoutes.get('/', ensureAuthenticated, userController.all)

userRoutes.delete('/delete/:id', ensureAuthenticated, userController.delete)

userRoutes.get('/user/:id', ensureAuthenticated, userController.one)
