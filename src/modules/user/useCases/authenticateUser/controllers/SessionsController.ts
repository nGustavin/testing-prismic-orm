import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../../../database/connection'
import { AppError } from '../../../../../errors/AppError'

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
export class AuthenticateUserController {
  async execute (req: Request, res: Response): Promise<IResponse | Record<string, any>> {
    const { email, password }: IRequest = req.body

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new AppError('Email or password incorrect', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401)
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
