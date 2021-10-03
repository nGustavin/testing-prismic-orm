import { prisma } from '../../../../../database/connection'
import { AppError } from '../../../../../errors/AppError'
import { Request, Response } from 'express'

export class TagController {
  async all (req: Request, res: Response): Promise<any> {
    const tags = await prisma.tag.findMany()

    if (!tags) {
      throw new AppError('No tags found', 404)
    }

    return res.status(200).json(tags)
  }

  async create (req: Request, res: Response): Promise<any> {
    const { name } = req.body

    if (!name) {
      throw new AppError('A name must be provided to create a tag', 400)
    }

    const tag = await prisma.tag.create({
      data: {
        name: name
      }
    })

    return res.status(201).json(tag)
  }
}
