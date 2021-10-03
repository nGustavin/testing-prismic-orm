import {Router} from 'express'

import {userRoutes} from './users.routes'
import {authenticateRoutes} from './authenticate.routes'

export const routes = Router()

routes.use(authenticateRoutes)
routes.use('/users', userRoutes)