import { Router } from "express";
import multer from "multer";

import { LoginUserController } from "../../../../controllers/User/LoginUserController";

import isAuthenticated from "../middleware/isAuthenticated"; // Ajuste se necessário

const router = Router();

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
import { UserController } from "../../../../controllers/User/UserController";

const animalController = new AnimalController();
router.use(isAuthenticated);

router.post("/animals", animalController.create);
router.get("/animals", animalController.findAll);
router.get("/animals/:id", animalController.findById);
router.put("/animals/:id", animalController.update);
router.delete("/animals/:id", animalController.delete);

export default router;
