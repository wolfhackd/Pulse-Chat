import type { Server, Socket } from "socket.io";


export function registerUserEvents(io: Server, socket: Socket){

    socket.on("disconnect", ()=>{
            io.emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    });
}