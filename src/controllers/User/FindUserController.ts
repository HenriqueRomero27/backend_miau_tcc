import { FindUserService } from "../../services/User/FindUserService";
import { Request, Response } from "express";
import AppError from "../../shared/error/AppError";

class FindUserController {
    async findById(req: Request, res: Response) {
        const { userId } = req.params;
        const findUserService = new FindUserService();

        try {
            const user = await findUserService.findById(userId);
            return res.json(user);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            // Em caso de erro desconhecido, retornar uma mensagem genérica
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async findAll(req: Request, res: Response) {
        const findUserService = new FindUserService();

        try {
            const users = await findUserService.findAll();
            return res.json(users);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            // Em caso de erro desconhecido, retornar uma mensagem genérica
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export { FindUserController };
