import type { FastifyReply } from "fastify";
import type { AuthenticatedRequest } from "../../shared/middlewares/auth.middleware.js";
import type { RoomService } from "./room.service.js";



export class RoomController {
    constructor(private readonly roomService: RoomService){}

    getAllMessagesByRoomId = async (req: AuthenticatedRequest, res: FastifyReply) => {
        try{
        const {roomId} = (req.params) as {roomId:string};

        if(!roomId || roomId.trim() === "") throw new Error("Missing roomId");

        const messages = await this.roomService.getAllMessagesByRoomId(roomId);
        return res.status(200).send(messages);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    getAllRooms = async (req: AuthenticatedRequest, res: FastifyReply) => {
        try{
            const rooms = await this.roomService.getAllRooms();
            return res.status(200).send(rooms);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    getRoomById = async (req: AuthenticatedRequest, res: FastifyReply) => {
        try{
            const {roomId} = (req.params) as {roomId:string};
            if(!roomId || roomId.trim() === "") throw new Error("Missing roomId");
            const room = await this.roomService.findRoomById(roomId);
            return res.status(200).send(room);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
            return res.status(500).send({ error: 'Internal server error' });
        }
    }
}