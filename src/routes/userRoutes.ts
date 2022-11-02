import { Router } from "express";
import UserController from "../controllers/userController";
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { UserSchema, RegisterSchema } from "../schemas/userSchema";
import upload from "../middlewares/fileManagementMiddleware";
import validateJWT from "../middlewares/validateJwtMiddleware";


const UserRoutes = Router();

UserRoutes.post("/sign-up", upload.single("profilePicture"), UserController.createUser);
UserRoutes.post("/login", validateSchemaMiddleware(UserSchema), UserController.loginUser);
UserRoutes.get("/user/me", validateJWT, UserController.getUser);

export default UserRoutes;