import {Router} from 'express'
import { UserController } from './controllers/UserController'

const userController = new UserController()

export const routes = Router()

routes.post('/users', userController.store)

routes.get('/users', userController.all)


