import type { Server, Socket } from "socket.io";
import { registerRoomEvents } from "./room.handler.js";
import { registerChatEvents } from "./chat.handler.js";
import { registerUserEvents } from "./user.handler.js";




export function registerConnection(io: Server, socket: Socket){
    console.log("Cliente conectado:", socket.id);

    registerRoomEvents(io, socket);
    registerChatEvents(io, socket);
    registerUserEvents(io, socket);
};