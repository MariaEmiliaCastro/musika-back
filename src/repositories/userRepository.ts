import { prisma } from "../config/database";
import { User } from "@prisma/client";
import { CreateUser } from "../types/userTypes";


const UserRepository = {
    getUserByEmail: async (email: string) => {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return userExists;
    },
    createUser:async (userData: CreateUser) => {
        await prisma.user.create({
            data: userData
        })
    },
    getUser: async (id: number) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    }
};

export default UserRepository;