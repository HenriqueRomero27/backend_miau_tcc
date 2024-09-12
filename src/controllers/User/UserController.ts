// AnimalController.ts
import { Request, Response } from "express";

import AppError from "../../shared/error/AppError";
import { UpdateUserService } from "../../services/User/UpdateUserService";
import { CreateUserService } from "../../services/User/CreateUserService";
import { DeleteUserService } from "../../services/User/DeleteUserService";
import { FindUserService } from "../../services/User/FindUserService";

class UserController {
    async create(req: Request, res: Response) {
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

    async update(req: Request, res: Response) {
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

    async delete(req: Request, res: Response) {
        const { userId } = req.params;
        const deleteUserService = new DeleteUserService();

        try {
            const deletedUser = await deleteUserService.execute(userId);
            return res.json(`User <b><i>${deletedUser.name}</b></i> deleted with succsses`);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }
}

export { UserController };
