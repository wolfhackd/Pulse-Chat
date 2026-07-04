import type { PrismaClient } from "../../generated/prisma/client.js";
import prisma from "../../database/db.js";


export class RoomRepository {
    constructor(private readonly database: PrismaClient = prisma){}

    getAllMessagesByRoomId = async (roomId: string) => {
        return await this.database.messages.findMany({where: {roomId}});
    }

    saveMessage = async (roomId: string, userId: string, message: string, username: string) => {
        return await this.database.messages.create({
            data: {
                roomId,
                userId,
                message,
                username
            }
        });
    }

    createRoom = async (roomName: string) => {
        return await this.database.room.create({
            data: {
                roomName
            }
        });
    }

    findRoomById = async (roomId: string) => {
        return await this.database.room.findUnique({where: {roomId}});
    }

    getAllRooms = async () => {
        return await this.database.room.findMany();
    }
}