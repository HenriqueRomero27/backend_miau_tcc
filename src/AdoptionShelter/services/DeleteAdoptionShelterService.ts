import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class DeleteAdoptionShelterService {
    async execute(id: string) {
        // Verificar se o abrigo de adoção existe
        const adoptionShelter = await prismaClient.adoptionShelter.findUnique({
            where: { id }
        });

        if (!adoptionShelter) {
            throw new AppError("Abrigo de adoção não encontrado", 404);
        }

        await prismaClient.adoptionShelter.delete({
            where: { id }
        });

        return { message: "Abrigo de adoção excluído com sucesso" };
    }
}

export { DeleteAdoptionShelterService };
