import { User } from '@prisma/client';
import { CreateUser } from "../types/userTypes";
import UserRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import utils from '../Utils/utils';

dotenv.config();
const bcrypt = require('bcrypt');

const UserService = {
    createUser: async (userData: CreateUser, file: any) => {
        const userExists = await UserRepository.getUserByEmail(userData.email);

        if(userExists){
            throw { type: "conflict", message: "user already registered!" };
        }

        userData.password = bcrypt.hashSync(userData.password, 10);

        if(file){
            userData.profilePicture = await utils.fileToBase64(file?.filename);
        }

        await UserRepository.createUser(userData);
    },
    loginUser: async (userData: CreateUser) => {
        const userExists = await UserRepository.getUserByEmail(userData.email);
        
        if(userExists){
            const validatePassword : boolean = bcrypt.compareSync(userData.password, userExists?.password);
            if(validatePassword){
                const SECRET: string = process.env.JWT_SECRET ?? ' ';
                const EXPIRES_IN: string = process.env.JWT_EXPIRES_IN as string;
    
                const payload = {
                    id: userExists.id,
                    email: userExists.email
                }
    
                const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
    
                return {
                        token: token,
                        name: userExists.name
                };
            }
            throw { type: "unauthorized", message: "wrong data!" };
        }

        throw { type: "unauthorized", message: "user data not found!" };
    },
    getUser: async (id: number) => {
        const user = await UserRepository.getUser(id);
        console.log(user);
        return user;
    }
};

export default UserService;