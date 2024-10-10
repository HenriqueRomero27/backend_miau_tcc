import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class ListAdoptionShelterService {
    async findById(id: string) {
        const adoptionShelter = await prismaClient.adoptionShelter.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                cnpj: true,
                phone: true,
                address: true,
                logo: true,
                animals: true
            }
        });

        if (!adoptionShelter) {
            throw new AppError("Abrigo de adoção não encontrado", 404);
        }

        return adoptionShelter;
    }
    async search(term: string) {
        const adoptionShelters = await prismaClient.adoptionShelter.findMany({
            where: {
                OR: [
                    { name: { contains: term, mode: 'insensitive' } },
                    { email: { contains: term, mode: 'insensitive' } },
                    { phone: { contains: term, mode: 'insensitive' } },
                    // Adicione outros campos que você deseja pesquisar
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                cnpj: true,
                phone: true,
                address: true,
                logo: true,
                animals: true
            }
        });
    
        return adoptionShelters;
    }
    
}

export { ListAdoptionShelterService };
