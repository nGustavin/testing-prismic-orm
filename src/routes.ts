import {Router} from 'express'

export const routes = Router()

routes.get('/', (req, res) => res.status(200).json("alo"))


