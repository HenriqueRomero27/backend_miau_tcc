import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/LoginUserService"

class LoginUserController {
    async handle(req: Request, res: Response) {
        const {email, password} = req.body

        const loginUserService = new LoginUserService()

        const auth = await loginUserService.execute({
            email,
            password
        })

        return res.json(auth)
    }
}

export {LoginUserController}