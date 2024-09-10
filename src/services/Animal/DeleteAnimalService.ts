// DeleteAnimalService.ts
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class DeleteAnimalService {
    async execute(id: string) {
        const animalExists = await prismaClient.animal.findUnique({
            where: { id: id }
        });

        if (!animalExists) {
            throw new AppError("Animal não encontrado", 404);
        }

        await prismaClient.animal.delete({
            where: { id: id }
        });
    }
}

export { DeleteAnimalService };
