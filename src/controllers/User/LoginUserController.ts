import { Request, Response } from "express";
import { LoginUserService } from "../../services/User/LoginUserService";
import AppError from "../../shared/error/AppError";

class LoginUserController {
    async execute(req: Request, res: Response) {
        const { email, password } = req.body;
        const loginUserService = new LoginUserService();

        try {
            const auth = await loginUserService.execute({
                email,
                password
            });
            return res.json(auth);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export { LoginUserController };
