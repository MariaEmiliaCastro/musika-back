import { Request, Response } from "express";
import { CreateUser } from "../types/userTypes";
import UserService from "../services/userService";

const UserController = {
    createUser: async (req: Request, res: Response) => {
        console.log(req.body)
        const file = req.file;
        console.log(file);
        const userData : CreateUser = req.body;

        console.log("request to create user: ", userData.email)
        await UserService.createUser(userData, file);
        console.log("user created: ", userData.email)
        res.sendStatus(201);
    },
    loginUser: async (req: Request, res: Response) => {
        const userData : CreateUser = req.body;
        console.log("request to login user: ", userData.email)
        const data = await UserService.loginUser(userData);
        console.log("user logged in: ", userData.email)
        res.send(data).status(200);
    },
    getUser: async (req: Request, res: Response) => {
        const id = res.locals.id as unknown as number;
        const userData = await UserService.getUser(id);
        res.send(userData);
    }
};

export default UserController;