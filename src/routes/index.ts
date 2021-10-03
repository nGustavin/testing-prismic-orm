import { Router } from 'express'

import { userRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { userTagsRoutes } from './userTags.routes'
import { tagsRoutes } from './tags.routes'

export const routes = Router()

routes.use(authenticateRoutes)
routes.use('/users', userRoutes)
routes.use('/tags', tagsRoutes)
routes.use('/user_tag', userTagsRoutes)
