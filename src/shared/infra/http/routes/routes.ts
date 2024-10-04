import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload"

import { UserController } from "../../../../controllers/User/UserController";
import { LoginUserController } from "../../../../controllers/User/LoginUserController";

import isAuthenticated from "../middleware/isAuthenticated"; // Ajuste se necessário

const router = Router();

// const upload = multer(uploadConfig.directory("./uploads"))

// Controllers
const userController = new UserController();
const loginUserController = new LoginUserController();

// Public Routes
router.post("/create-account", userController.create);
router.post("/login", loginUserController.execute); // Login não deve usar isAuthenticated

// Authenticated Routes
router.use(isAuthenticated);

router.get("/users/:userId", userController.findById);
router.get("/users", userController.findAll);
router.put("/users/:userId", userController.update);
router.delete("/users/:userId", userController.delete);

import { AnimalController } from "../../../../controllers/Animal/AnimalController"; 

const animalController = new AnimalController();
router.use(isAuthenticated);

router.post("/animal", animalController.create);
router.get("/animals", animalController.findAll);
router.get("/animal/:id", animalController.findById);
router.put("/animal/:id", animalController.update);
router.delete("/animal/:id", animalController.delete);

import { AdoptionShelterController } from "../../../../AdoptionShelter/controllers/AdoptionShelterController";

const adoptionShelterController = new AdoptionShelterController();
router.use(isAuthenticated);

router.post("/adoptionShelter", adoptionShelterController.create);
router.get("/adoptionShelters", adoptionShelterController.findAll);
router.get("/adoptionShelter/:id", adoptionShelterController.findById);
router.put("/adoptionShelter/:id", adoptionShelterController.update);
router.delete("/adoptionShelter/:id", adoptionShelterController.delete);

export default router;
