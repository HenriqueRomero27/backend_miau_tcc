// AnimalController.ts
import { Request, Response } from "express";
import { CreateAnimalService } from "../../services/Animal/CreateAnimalService"; 
import { ReadAnimalService } from "../../services/Animal/ReadAnimalService";
import { UpdateAnimalService } from "../../services/Animal/UpdateAnimalService"; 
import { DeleteAnimalService } from "../../services/Animal/DeleteAnimalService"; 
import AppError from "../../shared/error/AppError";

class AnimalController {
    async create(req: Request, res: Response) {
        const createAnimalService = new CreateAnimalService();
        try {
            const animal = await createAnimalService.execute(req.body);
            return res.status(201).json(animal);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async findAll(req: Request, res: Response) {
        const readAnimalService = new ReadAnimalService();
        try {
            const animals = await readAnimalService.findAll();
            return res.status(200).json(animals);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const readAnimalService = new ReadAnimalService();
        try {
            const animal = await readAnimalService.findById(id);
            return res.status(200).json(animal);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updateAnimalService = new UpdateAnimalService();
        try {
            const updatedAnimal = await updateAnimalService.execute(id, req.body);
            return res.status(200).json(updatedAnimal);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const deleteAnimalService = new DeleteAnimalService();
        try {
            await deleteAnimalService.execute(id);
            return res.status(204).send();
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }
}

export { AnimalController };
