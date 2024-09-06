import { UpdateUserService } from "../../services/User/UpdateUserService";
import { Request, Response } from "express";
import AppError from "../../shared/error/AppError";

class UpdateUserController {
    async execute(req: Request, res: Response) {
        const { userId } = req.params;
        const updateData = req.body;
        const updateUserService = new UpdateUserService();

        try {
            const updatedUser = await updateUserService.execute(userId, updateData);
            return res.json(updatedUser);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }
}

export { UpdateUserController };
