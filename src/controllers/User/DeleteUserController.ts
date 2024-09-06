import { DeleteUserService } from "../../services/User/DeleteUserService";
import { Request, Response } from "express";
import AppError from "../../shared/error/AppError";

class DeleteUserController {
    async execute(req: Request, res: Response) {
        const { userId } = req.params;
        const deleteUserService = new DeleteUserService();

        try {
            const deletedUser = await deleteUserService.execute(userId);
            return res.json(deletedUser);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }
}

export { DeleteUserController };
