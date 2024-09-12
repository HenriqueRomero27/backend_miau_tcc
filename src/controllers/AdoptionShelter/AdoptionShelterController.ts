import { Request, Response } from "express";
import { CreateAdoptionShelterService } from "../../services/AdoptionShelter/CreateAdoptionShelterService"; 
import { ListAdoptionShelterService } from "../../services/AdoptionShelter/ListAdoptionShelterService"; 
import { UpdateAdoptionShelterService } from "../../services/AdoptionShelter/UpdateAdoptionShelterService"; 
import { DeleteAdoptionShelterService } from "../../services/AdoptionShelter/DeleteAdoptionShelterService"; 
import AppError from "../../shared/error/AppError";

class AdoptionShelterController {
    private createAdoptionShelterService: CreateAdoptionShelterService;
    private listAdoptionShelterService: ListAdoptionShelterService;
    private updateAdoptionShelterService: UpdateAdoptionShelterService;
    private deleteAdoptionShelterService: DeleteAdoptionShelterService;

    constructor() {
        this.createAdoptionShelterService = new CreateAdoptionShelterService();
        this.listAdoptionShelterService = new ListAdoptionShelterService();
        this.updateAdoptionShelterService = new UpdateAdoptionShelterService();
        this.deleteAdoptionShelterService = new DeleteAdoptionShelterService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const {
                cnpj,
                photos,
                logo,
                phone,
                email,
                name,
                password,
                animals,
                address,
                created_at,
                updated_at
            } = req.body;

            if (!cnpj || !email || !password) {
                throw new AppError("CNPJ, email e senha são obrigatórios", 400);
            }

            const shelter = await this.createAdoptionShelterService.execute({
                cnpj,
                name,
                photos,
                logo,
                phone,
                email,
                password,
                animals,
                address,
                created_at,
                updated_at
            });

            return res.status(201).json(shelter);
        } catch (error) {
           if(error instanceof AppError) {
               return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // async get(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { id } = req.params;

    //         const shelter = await this.listAdoptionShelterService.execute(id);

    //         return res.status(200).json(shelter);
    //     } catch (error) {
    //        if(error instanceof AppError) {
    //             return res.status(error.statusCode || 500).json({ message: error.message });
    //         }
    //         return res.status(500).json({ message: "Erro interno do servidor" });
    //     }
    // }

    async findAll(req: Request, res: Response) {
        const listAdoptionShelterService = new ListAdoptionShelterService();
        try {
            const shelters = await listAdoptionShelterService.findAll();
            return res.status(200).json(shelters);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const listAdoptionShelterService = new ListAdoptionShelterService();
        try {
            const shelter = await listAdoptionShelterService.findById(id);
            return res.status(200).json(shelter);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const {
                cnpj,
                name,
                photos,
                logo,
                phone,
                email,
                password,
                animals,
                address,
                created_at,
                updated_at
            } = req.body;

            const updatedShelter = await this.updateAdoptionShelterService.execute(id, {
                cnpj,
                name,
                photos,
                logo,
                phone,
                email,
                password,
                animals,
                address,
                created_at,
                updated_at
            });

            return res.status(200).json(updatedShelter);
        } catch (error) {
           if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.deleteAdoptionShelterService.execute(id);

            return res.status(200).json({ message: "Abrigo de adoção excluído com sucesso" });
        } catch (error) {
           if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export { AdoptionShelterController };
