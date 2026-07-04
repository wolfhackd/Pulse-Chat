import type { RoomRepository } from "./room.repository.js";




export class RoomService{
    constructor(private readonly roomRepository: RoomRepository){}

    getAllMessagesByRoomId = async (roomId: string) => {
        return await this.roomRepository.getAllMessagesByRoomId(roomId);
    }

    saveMessage = async (roomId: string, userId: string, message: string,username: string) => {
        return await this.roomRepository.saveMessage(roomId, userId, message, username);
    }

    createRoom = async (roomName: string) =>{
        return await this.roomRepository.createRoom(roomName);
    }

    findRoomById = async (roomId: string) => {
        return await this.roomRepository.findRoomById(roomId);
    }

    getAllRooms = async () => {
        return await this.roomRepository.getAllRooms();
    }

}