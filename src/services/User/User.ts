import { UserRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import { hash } from "bcryptjs";
import AppError from "../../shared/error/AppError";

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if (!email) {
            throw new Error("Email incorreto ")
        }

        //Verificar se este email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Usuário já existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return (user)
    }
}

export { CreateUserService }