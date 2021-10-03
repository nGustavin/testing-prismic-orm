import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { TagController } from '../modules/tags/useCases/tagCRUD/controllers/TagController'

const tagController = new TagController()

export const tagsRoutes = Router()

tagsRoutes.use(ensureAuthenticated)

tagsRoutes.get('/', tagController.all)

tagsRoutes.post('/new', tagController.create)
