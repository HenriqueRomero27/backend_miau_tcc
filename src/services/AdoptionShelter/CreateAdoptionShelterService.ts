import { hash } from "bcryptjs";
import { AdoptionShelterRequest } from "../../@types/interfaces";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";
import { Animal } from "@prisma/client";

class CreateAdoptionShelterService {
    async execute({
        cnpj,
        photos: [],
        logo,
        name,
        phone,
        email,
        password,
        animals: [{
            ra,
            animalName,
            age,
            gender,
            breed,
            fur,
            furColor,
            temperament,
            neutred,
            notes,
            animalPhotos: []
        }],
        address: { street, cep, complement, neighborhood, city, state, number },
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
            throw new AppError("Casa de Adoção já existe", 400);
        }

        const passwordHash = await hash(password, 8);

        try {
            const adoptionShelter = await prismaClient.adoptionShelter.create({
                data: {
                    cnpj,
                    name,
                    photos: [], // Verifique se isso é o que você deseja
                    logo,
                    phone,
                    email,
                    password: passwordHash,
                    animals: [{
                        create: [{ // Use 'create' se estiver criando novos registros relacionados
                            ra,
                            animalName,
                            age,
                            gender,
                            breed,
                            fur,
                            furColor,
                            temperament,
                            neutred,
                            notes,
                            animalPhotos: []
                        }]
                    }],
                    address: {
                        create: { // Use 'create' para criar um novo endereço
                            street,
                            cep,
                            complement,
                            neighborhood,
                            city,
                            state,
                            number
                        }
                    },
                    created_at,
                    updated_at
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
        } catch (error) {
            console.error('Erro ao criar abrigo:', error);
            throw new AppError('Erro ao criar abrigo de adoção', 500);
        }

    }
}

export { CreateAdoptionShelterService };
