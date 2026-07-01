import type { FastifyInstance } from "fastify";
import { RoomController } from "./room.controller.js";
import { RoomService } from "./room.service.js";
import { RoomRepository } from "./room.repository.js";

const repository = new RoomRepository();
export const roomService = new RoomService(repository);
const controller = new RoomController(roomService);
//construo a parte do controller


export const RoomRoutes = async (app: FastifyInstance) => {

    //se der erro é porque a rota e o socket não pode ser a mesma
    // app.get("/", controller.getAllRooms);
    app.get("/:roomId/messages", controller.getAllMessagesByRoomId)
}