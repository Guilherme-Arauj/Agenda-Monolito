// src/Interface-Adaptors/gateways/UserRepositoryImpl.ts
import { User } from "../../../Domain/entities/User";
import { IUserRepository } from "./IUserRepository";
import prisma from "../../../infrastructure/database/PrismaConfig";

export class UserRepository implements IUserRepository {

    public async create(user: User): Promise<User> {
        return prisma.user.create({
            data: {
                id: user.id,
                name: user.name,  
                email: user.email,
                password: user.password
            }
        });
    }

    public async validate(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
}
