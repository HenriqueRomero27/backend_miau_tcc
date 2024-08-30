import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../../../../controllers/User/CreateUserController"
import { LoginUserController } from "../../../../controllers/User/LoginUserController";
import { DetailUserController } from "../../../../controllers/User/DetailUserController";

const routes = Router()

// User Routes
routes.post("/create-account", new CreateUserController().execute)
routes.post("/login", new LoginUserController().execute)
routes.get("/user", new DetailUserController().execute)

export default routes;