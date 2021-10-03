import {Router} from 'express'
import { AuthenticateUserController } from '../modules/user/useCases/authenticateUser/controllers/SessionsController'

const authenticateUserController = new AuthenticateUserController()

export const authenticateRoutes = Router()

authenticateRoutes.post('/sessions', authenticateUserController.execute)