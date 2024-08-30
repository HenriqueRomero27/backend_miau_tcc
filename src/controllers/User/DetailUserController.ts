import { Request, Response } from "express"
import { DetailUserService } from "../../services/User/DetailUserService"

class DetailUserController {
    async execute(req: Request, res: Response) {

        const user_id = req.user.id

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(user_id)

        return res.json(user)
    }
}

export { DetailUserController }