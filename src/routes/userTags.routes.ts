import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UserTagsController } from '../modules/tags/useCases/addTagToAnUser/controllers/UserTagsControllers'

const tagController = new UserTagsController()

export const userTagsRoutes = Router()

userTagsRoutes.use(ensureAuthenticated)

userTagsRoutes.post('/add', tagController.addTag)
