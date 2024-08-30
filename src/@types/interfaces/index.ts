import { Address } from "@prisma/client"

interface UserRequest {
    email: string,
    name: string,
    password: string,
    birthday: Date,
    cpf: string,
    address: Address,
    phone: string,
    created_at: Date,
    updated_at: Date
}

export {UserRequest}