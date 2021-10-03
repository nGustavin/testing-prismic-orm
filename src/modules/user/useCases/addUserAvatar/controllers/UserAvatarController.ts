import { AppError } from '../../../../../errors/AppError'
import { Request, Response } from 'express'
import { prisma } from '../../../../../database/connection'

export class UserAvatarController {
  async add (req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const avatarFile = req.file?.filename

    if (!avatarFile) {
      throw new AppError('A valid avatar file must be passed to update user avatar')
    }

    const newUser = await prisma.user.update({
      where: { id },
      data: {
        avatar: avatarFile
      }
    })
  }
}
