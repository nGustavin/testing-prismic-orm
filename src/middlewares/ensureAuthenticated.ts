import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { prisma } from '../database/connection'
import { AppError } from '../errors/AppError'

type IPayload = {
    sub: string;
}

export async function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, '0b8aa71d7e2df0e935f77bffd93837af') as IPayload
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
