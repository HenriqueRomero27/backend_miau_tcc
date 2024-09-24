import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import { AdoptionShelterController } from '../controllers/AdoptionShelterController';
import isAuthenticated from '../../shared/infra/http/middleware/isAuthenticated';

const adoptionSheltersRouter = Router();
const adoptionShelterController = new AdoptionShelterController();

const upload = multer(uploadConfig);

// Public Routes
adoptionSheltersRouter.get('/', adoptionShelterController.findAll);

adoptionSheltersRouter.get('/:id', adoptionShelterController.findById);

// Create Adoption Shelter with validation
adoptionSheltersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj: Joi.string().required(),
      logo: Joi.string().optional(), // logo pode ser um URL ou arquivo
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.object().required().keys({
        street: Joi.string().required(),
        cep: Joi.string().required(),
        complement: Joi.string().optional(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        number: Joi.string().required(),
      }),
      animals: Joi.array().items(Joi.object().keys({
        ra: Joi.string().required(),
        animalName: Joi.string().required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        breed: Joi.string().required(),
        fur: Joi.string().required(),
        furColor: Joi.string().required(),
        temperament: Joi.string().required(),
        neutred: Joi.string().valid('Sim', 'Não').required(),
        notes: Joi.string().optional(),
        animalPhotos: Joi.array().items(Joi.string()).optional(),
      })).optional(),
    },
  }),
  adoptionShelterController.create,
);

// Authenticated Routes
adoptionSheltersRouter.use(isAuthenticated);

adoptionSheltersRouter.put('/:id', adoptionShelterController.update);
adoptionSheltersRouter.delete('/:id', adoptionShelterController.delete);

export default adoptionSheltersRouter;
