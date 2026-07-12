import type { Server, Socket } from "socket.io";
import { registerRoomEvents } from "./handlers/room.handler.js";
import { registerChatEvents } from "./handlers/chat.handler.js";
import { registerUserEvents } from "./handlers/user.handler.js";
import { onlineUsersService} from "./services/onlineUsers.service.js";




export function registerConnection(io: Server, socket: Socket){

    onlineUsersService.addUser(socket.data.user.userId, socket.id);

    registerRoomEvents(io, socket);
    registerChatEvents(io, socket);
    registerUserEvents(io, socket);

    socket.on("disconnect", () =>{
        onlineUsersService.removeUser(socket.data.user.userId);
    })
};