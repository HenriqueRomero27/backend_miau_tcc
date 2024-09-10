// ReadAnimalService.ts
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class ReadAnimalService {
    async findById(id: string) {
        const animal = await prismaClient.animal.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                ra: true,
                age: true,
                gender: true,
                breed: true,
                fur: true,
                furColor: true,
                temperament: true,
                neutred: true,
                notes: true,
                photos: true,
                adoptionApplication: true,
                adoptionShelter: true,
                created_at: true,
                updated_at: true
            }
        });

        if (!animal) {
            throw new AppError("Animal não encontrado", 404);
        }

        return animal;
    }

    async findAll() {
        const animals = await prismaClient.animal.findMany({
            select: {
                id: true,
                name: true,
                ra: true,
                age: true,
                gender: true,
                breed: true,
                fur: true,
                furColor: true,
                temperament: true,
                neutred: true,
                notes: true,
                photos: true,
                adoptionApplication: true,
                adoptionShelter: true,
                created_at: true,
                updated_at: true
            }
        });

        return animals;
    }
}

export { ReadAnimalService };
