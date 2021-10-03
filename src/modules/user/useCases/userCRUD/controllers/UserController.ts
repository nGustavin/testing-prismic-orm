import { hash } from 'bcryptjs'
import { Request, Response } from 'express'
import { prisma } from '../../../../../database/connection'
import { AppError } from '../../../../../errors/AppError'

type User = {
    id: string;
    bio: string;
    name: string;
    password: string;
    age: number;
    email: string;
}

export class UserController {
  async store (req: Request, res: Response): Promise<any> {
    const {
      age,
      bio,
      email,
      name,
      password
    }: User = req.body

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        age, bio, email, name, password: passwordHash
      }
    })

    res.status(200).json(user)
  }

  async all (req: Request, res: Response): Promise<any> {
    const users = await prisma.user.findMany({
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    })

    res.status(200).json(users)
  }

  async delete (req: Request, res: Response): Promise<any> {
    const { id } = req.params

    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id
        }
      })
      return res.status(200).json(deleteUser)
    } catch (err) {
      return res.status(500).json({ err, log: 'Test dnv soq 14' })
    }
  }

  async one (req: Request, res: Response): Promise<any> {
    const { id } = req.params

    const user = await prisma.user.findFirst({
      where: {
        id: id
      }
    })

    if (!user) {
      throw new AppError('User not found', 401)
    }

    return res.status(200).json(user)
  }
}
