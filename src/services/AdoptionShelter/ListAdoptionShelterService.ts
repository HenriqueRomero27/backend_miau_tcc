import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class ListAdoptionShelterService {
    async execute(id: string) {
        const adoptionShelter = await prismaClient.adoptionShelter.findUnique({
            where: { id },
            include: {
                animals: true // Incluindo animais relacionados
            }
        });

        if (!adoptionShelter) {
            throw new AppError("Abrigo de adoção não encontrado", 404);
        }

        return adoptionShelter;
    }
}

export { ListAdoptionShelterService };
