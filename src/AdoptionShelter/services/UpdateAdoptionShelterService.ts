import { AdoptionShelterRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class UpdateAdoptionShelterService {
    async execute(id: string, {
        cnpj,
        photos,
        logo,
        phone,
        email,
        password,
        animals, // Lista de IDs dos animais
        address,
        updated_at
    }: AdoptionShelterRequest) {

        // Verificar se o abrigo de adoção existe
        const adoptionShelter = await prismaClient.adoptionShelter.findUnique({
            where: { id }
        });

        if (!adoptionShelter) {
            throw new AppError("Abrigo de adoção não encontrado", 404);
        }

        const updatedShelter = await prismaClient.adoptionShelter.update({
            where: { id },
            data: {
                cnpj: cnpj ?? adoptionShelter.cnpj,
                photos: photos ?? adoptionShelter.photos,
                logo: logo ?? adoptionShelter.logo,
                phone: phone ?? adoptionShelter.phone,
                email: email ?? adoptionShelter.email,
                password: password ?? adoptionShelter.password,
                // animals: ,
                updated_at: updated_at ?? adoptionShelter.updated_at
            },
            include: {
                animals: true
            }
        });

        return updatedShelter;
    }
}

export { UpdateAdoptionShelterService };
