import type { PrismaClient } from "../../generated/prisma/client.js";
import prisma from "../../database/db.js";

export class UserRepository {
    constructor(readonly database: PrismaClient = prisma) {}

    create = async({ username, email, password }: { username: string; email: string; password: string }) => {
        return await this.database.user.create({
            data:{
                username,
                email,
                password
            }
        })
    }

    findByEmail = async (email: string) => {
        return await this.database.user.findUnique({
            where: {
                email
            }
        })
    }

    findByUsername = async (username: string) => {
        return await this.database.user.findUnique({
            where: {
                username
            }
        })
    }
}