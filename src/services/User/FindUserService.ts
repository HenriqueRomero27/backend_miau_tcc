import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class FindUserService {
    async findById(userId: string) {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                // address: true,
                cpf: true
            }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        return user;
    }

    async findAll() {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                // address: true,
                cpf: true
            }
        });

        return users;
    }
}

export { FindUserService };
