import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../../../../controllers/User/CreateUserController";
import { LoginUserController } from "../../../../controllers/User/LoginUserController";
import { DetailUserController } from "../../../../controllers/User/DetailUserController";
import { FindUserController } from "../../../../controllers/User/FindUserController";
import { UpdateUserController } from "../../../../controllers/User/UpdateUserController"; // Corrigido aqui
import { DeleteUserController } from "../../../../controllers/User/DeleteUserController";
import isAuthenticated from "../middleware/isAuthenticated"; // Ajuste se necessário

const router = Router();

// Controllers
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const detailUserController = new DetailUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

// Public Routes
router.post("/create-account", createUserController.execute);
router.post("/login", loginUserController.execute); // Login não deve usar isAuthenticated

// Authenticated Routes
router.use(isAuthenticated);

router.get("/user", detailUserController.execute);
router.get("/users/:userId", findUserController.findById);
router.get("/users", findUserController.findAll);
router.put("/users/:userId", updateUserController.execute);
router.delete("/users/:userId", deleteUserController.execute);

export default router;
