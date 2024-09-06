import { AnimalRequest, UserRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

class CreateUserService {
    async execute({name, ra, age, gender, breed, fur, furColor, temperament, neutred, notes, photos, created_at, updated_at, adoptionApplication, adoptionShelter}: AnimalRequest) {

        //Verificar se este email ja esta cadastrado
        const animalAlreadyExists = await prismaClient.animal.findFirst({
            where: {
                ra: ra
            }
        })

        if (animalAlreadyExists) {
            throw new AppError("Animal já existe", 400)
        }

        const animal = await prismaClient.animal.create({
            data: {
                name: name,
                ra: ra,
                age: age,
                gender: gender,
                breed: breed,
                fur: fur,
                furColor: furColor ,
                temperament: temperament,
                neutred: neutred,
                notes: notes,
                photos: photos,
                created_at: created_at,
                updated_at: updated_at,
                adoptionApplication: {
                    connect: { id: adoptionApplication.id }
                },
                adoptionShelter: {
                    connect: { id: adoptionShelter.id }
                }
            },
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
        })

        return (animal)
    }
}

export { CreateUserService }