import { AdoptionShelterRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class CreateAdoptionShelterService {
    async execute({
        cnpj,
        photos,
        logo,
        name,
        phone,
        email,
        password,
        animals,
        address,
        created_at,
        updated_at
    }: AdoptionShelterRequest) {

        // Verificar se este CNPJ já está cadastrado
        const shelterAlreadyExists = await prismaClient.adoptionShelter.findFirst({
            where: {
                cnpj: cnpj
            }
        });

        if (shelterAlreadyExists) {
            throw new AppError("Adoção já existe", 400);
        }

        const adoptionShelter = await prismaClient.adoptionShelter.create({
            data: {
                cnpj: cnpj,
                name: name,
                photos: photos,
                logo: logo,
                phone: phone,
                email: email,
                password: password,
                animals: {
                    // connect: animals.map((animalId) => ({ id: animalId }))
                },
                address: address,
                created_at: created_at,
                updated_at: updated_at
            },
            select: {
                id: true,
                name: true,
                cnpj: true,
                photos: true,
                logo: true,
                phone: true,
                email: true,
                password: true,
                animals: true,
                address: true,
                created_at: true,
                updated_at: true
            }
        });

        return adoptionShelter;
    }
}

export { CreateAdoptionShelterService };
