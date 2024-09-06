import { Address, AdoptionApplication, AdoptionShelter } from "@prisma/client"

interface UserRequest {
    email: string,
    name: string,
    password: string,
    birthday: string,
    cpf: string,
    address: Address,
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

export {UserRequest, AnimalRequest}