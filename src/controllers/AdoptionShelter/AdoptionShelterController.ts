import { Request, Response } from "express";
import { ListAdoptionShelterService } from "../../services/AdoptionShelter/ListAdoptionShelterService"; 
import { UpdateAdoptionShelterService } from "../../services/AdoptionShelter/UpdateAdoptionShelterService"; 
import { DeleteAdoptionShelterService } from "../../services/AdoptionShelter/DeleteAdoptionShelterService"; 
import { CreateAdoptionShelterService } from "../../services/AdoptionShelter/CreateAdoptionShelterService";
import AppError from "../../shared/error/AppError";

class AdoptionShelterController {
    async create(req: Request, res: Response) {
        const {
            cnpj,
            photos = [], // Valor padrão para photos
            logo,
            phone,
            email,
            name,
            password,
            animals = [], // Valor padrão para animals
            address,
            created_at,
            updated_at
        } = req.body;
    
        const createAdoptionShelterService = new CreateAdoptionShelterService();
    
        const shelter = await createAdoptionShelterService.execute({
            cnpj,
            name,
            photos,
            logo,
            phone,
            email,
            password,
            animals: animals.map((animal: { ra: any; animalName: any; age: any; gender: any; breed: any; fur: any; furColor: any; temperament: any; neutred: any; notes: any; animalPhotos: any; }) => ({
                ra: animal.ra,
                animalName: animal.animalName,
                age: animal.age,
                gender: animal.gender,
                breed: animal.breed,
                fur: animal.fur,
                furColor: animal.furColor,
                temperament: animal.temperament,
                neutred: animal.neutred,
                notes: animal.notes,
                animalPhotos: animal.animalPhotos || []
            })),
            address,
            created_at,
            updated_at
        });
    
        return res.json(shelter);
    }
    
    

    async findAll(req: Request, res: Response): Promise<Response> {
        const findAdoptionShelters = new ListAdoptionShelterService()
        try {
            // Use await para garantir que a Promise seja resolvida antes de continuar
            const shelters = await findAdoptionShelters.findAll();
            return res.status(200).json(shelters);  // Retorne os dados resolvidos
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    
    async findById(req: Request, res: Response) {
        const findAdoptionSheltersById = new ListAdoptionShelterService()
        const { id } = req.params;
        try {
            const shelter = await findAdoptionSheltersById.findById(id);
            return res.status(200).json(shelter);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    

    async update(req: Request, res: Response): Promise<Response> {
        const updateAdoptionShelterService = new UpdateAdoptionShelterService()
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

            const updatedShelter = await updateAdoptionShelterService.execute(id, {
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
            return res.status(500).json({ message: error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const deleteAdoptionShelterService = new DeleteAdoptionShelterService()
        try {
            const { id } = req.params;
    
            deleteAdoptionShelterService.execute(id);
    
            return res.status(200).json({ message: "Abrigo de adoção excluído com sucesso" });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode || 500).json({ message: error.message });
            }
            console.error(error); // Adicione logging para ajudar no diagnóstico
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    
}

export { AdoptionShelterController };
