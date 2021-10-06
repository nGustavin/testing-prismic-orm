import { AppError } from '../../../../../errors/AppError'
import { Request, Response } from 'express'
import { prisma } from '../../../../../database/connection'

export class UserTagsController {
  async addTag (req: Request, res: Response): Promise<any> {
    const {
      user,
      tag
    } = req.body

    if (!user || !tag) {
      throw new AppError('tag or user invalid')
    }

    const newUserTag = await prisma.userTags.createMany({
      data: tag.map((tagId: number) => {
        return {
          userId: user,
          tagId: tagId
        }
      })
    })

    return res.status(201).json(newUserTag)
  }
}
