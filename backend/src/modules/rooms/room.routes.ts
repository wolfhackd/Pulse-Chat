import type { FastifyInstance } from "fastify";


const controller = RoomController();
//construo a parte do controller


export const RoomRoutes = async (app: FastifyInstance) => {
    app.get("/", controller.getAllRooms);
}