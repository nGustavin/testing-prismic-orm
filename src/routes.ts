import {Router} from 'express'
import { UserController } from './modules/user/useCases/userCRUD/controllers/UserController'

const userController = new UserController()

export const routes = Router()

routes.post('/new', userController.store)

routes.get('/', userController.all)

routes.delete('/delete/:id', userController.delete)
 
routes.get('/user/:id', userController.one)