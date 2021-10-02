import { PrismaClient, Prisma } from '@prisma/client'
import { Request, Response } from 'express'


type User = {
    id: string;
    bio: string;
    name: string;
    password: string;
    age: number;
    email: string;
}

const prisma = new PrismaClient()

export class UserController{
    async store(req: Request, res: Response): Promise<any>{
        const {
            age,
            bio,
            email,
            name,
            password,
        }: User = req.body

        await prisma.user.create({
            data: {
                age, bio, email, name, password
            }
        })

        res.status(200).json("User created")
    }

    async all(req: Request, res: Response): Promise<any>{
        const users = await prisma.user.findMany()

        res.status(200).json(users)

    }
}