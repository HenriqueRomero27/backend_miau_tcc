import { UserRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import { hash } from "bcryptjs";
import AppError from "../../shared/error/AppError";
import { Prisma } from "@prisma/client";

class UpdateUserService {
    async execute(userId: string, updateData: Partial<UserRequest>) {
        // Verificar se o email já está em uso por outro usuário
        if (updateData.email) {
            const userWithEmail = await prismaClient.user.findFirst({
                where: {
                    email: updateData.email,
                    NOT: { id: userId }
                }
            });

            if (userWithEmail) {
                throw new AppError("[ERRO] Email já está em uso", 400);
            }
        }


        // Hash da senha se fornecida
        if (updateData.password) {
            updateData.password = await hash(updateData.password, 8);
        }

        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                ...updateData,
            } as Prisma.UserUpdateInput, // Explicitamente definir o tipo para UserUpdateInput
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                cpf: true
            }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
