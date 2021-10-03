import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

type IRequest = {
    email: string;
    password: string;
}

type IResponse = {
    user: {
        name: string;
        email: string;
        age: number;
        bio: string;

    };
    token: string;
}

const prisma = new PrismaClient()

export class AuthenticateUserController {
  async execute (req: Request, res: Response): Promise<IResponse | Record<string, any>> {
    const { email, password }: IRequest = req.body

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(403).json({ error: 'Email or password incorrect' })
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return res.status(403).json({ error: 'Email or password incorrect' })
    }

    const token = sign({}, '0b8aa71d7e2df0e935f77bffd93837af', {
      subject: user.id,
      expiresIn: '1d'
    })

    const userToResponse = {
      id: user.id,
      name: user.name,
      bio: user.bio,
      email: user.email,
      age: user.age
    }

    return res.status(200).json({ user: userToResponse, token })
  }
}
