import type { PrismaClient } from "../../generated/prisma/client.js";
import prisma from "../../database/db.js";

export class UserRepository {
    constructor(readonly database: PrismaClient = prisma) {}

    async create({ username, email, password }: { username: string; email: string; password: string }) {
        return await this.database.user.create({
            data:{
                username,
                email,
                password
            }
        })
    }

    async findByEmail(email: string) {
        return await this.database.user.findUnique({
            where: {
                email
            }
        })
    }
}