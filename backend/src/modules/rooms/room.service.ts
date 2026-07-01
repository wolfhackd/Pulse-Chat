import type { RoomRepository } from "./room.repository.js";




export class RoomService{
    constructor(private readonly roomRepository: RoomRepository){}

    getAllMessagesByRoomId = async (roomId: string) => {
        return await this.roomRepository.getAllMessagesByRoomId(roomId);
    }

    saveMessage = async (roomId: string, userId: string, message: string) => {
        return await this.roomRepository.saveMessage(roomId, userId, message);
    }

}