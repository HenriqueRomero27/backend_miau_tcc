import {CreateUserService} from "../../services/User/CreateUserService"
import { Request, Response } from "express"

class CreateUserController {
    async execute(req: Request, res: Response){
        const {name, email, password, birthday, cpf, address, phone, created_at, updated_at} = req.body
        const createUserService = new CreateUserService()

        const user = await createUserService.execute({
            name, 
            email, 
            password,
            birthday,
            cpf,
            address,
            phone,
            created_at,
            updated_at
        })

        return res.json(user)
    }
}

export {CreateUserController}