import { AdoptionApplication, AdoptionShelter, Animal } from "@prisma/client"

interface UserRequest {
    email: string,
    name: string,
    password: string,
    birthday: string,
    cpf: string,
    street: string,
    cep: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    numberHouse: string,
    phone: string,
    created_at: Date,
    updated_at: Date
}

interface AnimalRequest {
    name: string,
    ra: string,
    age: number,
    gender: string,
    breed: string,
    fur: string,
    furColor: string,
    temperament: string,
    neutred: string,
    notes: string,
    photos: string[],
    created_at: Date,
    updated_at: Date,
    adoptionShelter: AdoptionShelter,
    adoptionApplication: AdoptionApplication
}

interface AdoptionShelterRequest {
    cnpj: string,
    name: string,
    photos: string[],
    logo: string,
    phone: string,
    email: string,
    password: string,
    animals: [{
        animalName: string,
        ra: string,
        age: number,
        gender: string,
        breed: string,
        fur: string,
        furColor: string,
        temperament: string,
        neutred: string,
        notes: string,
        animalPhotos: string[],
    }],
    address: {
        street: string,
        cep: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: string,
        number: number
    },
    created_at: Date,
    updated_at: Date
}

export {UserRequest, AnimalRequest, AdoptionShelterRequest}