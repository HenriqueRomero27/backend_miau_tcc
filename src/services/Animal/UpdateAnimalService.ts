// UpdateAnimalService.ts
import { AnimalRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class UpdateAnimalService {
    async execute(id: string, data: AnimalRequest) {
        const animalExists = await prismaClient.animal.findUnique({
            where: { id: id }
        });

        if (!animalExists) {
            throw new AppError("Animal não encontrado", 404);
        }

        const updatedAnimal = await prismaClient.animal.update({
            where: { id: id },
            data: {
                name: data.name,
                ra: data.ra,
                age: data.age,
                gender: data.gender,
                breed: data.breed,
                fur: data.fur,
                furColor: data.furColor,
                temperament: data.temperament,
                neutred: data.neutred,
                notes: data.notes,
                photos: data.photos,
                updated_at: new Date(), // Atualizando o campo updated_at

                // Atualizando as relações
                adoptionApplication: data.adoptionApplication
                    ? { connect: { id: data.adoptionApplication.id } }
                    : undefined,
                adoptionShelter: data.adoptionShelter
                    ? { connect: { id: data.adoptionShelter.id } }
                    : undefined,
            }
        });

        return updatedAnimal;
    }
}

export { UpdateAnimalService };
