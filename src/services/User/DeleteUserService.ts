import prismaClient from "../../prisma/prisma";

class DeleteUserService {
    async execute(userId: string) {
        const user = await prismaClient.user.delete({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                address: true,
                cpf: true
            }
        });

        return user;
    }
}

export { DeleteUserService };
