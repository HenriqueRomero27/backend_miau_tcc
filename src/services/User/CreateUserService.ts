import { UserRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import { hash } from "bcryptjs";
import AppError from "../../shared/error/AppError";

class CreateUserService {
    async execute({name, email, password, phone, birthday, address, cpf, created_at, updated_at}: UserRequest) {
        if (!email) {
            throw new AppError("Email incorreto", 400)
        }

        //Verificar se este email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new AppError("Usuário já existe", 400)
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone: phone,
                birthday: birthday,
                address: {},
                cpf: cpf,
                created_at: created_at,
                updated_at: updated_at
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                address: true,
                cpf: true
            }
        })

        return (user)
    }
}

export { CreateUserService }