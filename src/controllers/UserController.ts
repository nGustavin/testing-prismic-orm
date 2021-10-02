import { PrismaClient, Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import {hash} from 'bcryptjs'


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

        const passwordHash = await hash(password, 8)

        await prisma.user.create({
            data: {
                age, bio, email, name, password: passwordHash,
            }
        })

        res.status(200).json("User created")
    }

    async all(req: Request, res: Response): Promise<any>{
        const users = await prisma.user.findMany()

        res.status(200).json(users)

    }

    async delete(req: Request, res: Response): Promise<any>{
        const { id } = req.params

        const deleteUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return res.status(200).json(deleteUser)
    }
}