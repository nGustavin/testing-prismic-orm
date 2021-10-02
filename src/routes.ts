import {Router} from 'express'
import { UserController } from './controllers/UserController'

const userController = new UserController()

export const routes = Router()

routes.post('/user/new', userController.store)

routes.get('/users', userController.all)

routes.delete('user/delete/:id', userController.delete)