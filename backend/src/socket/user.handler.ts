import type { Server, Socket } from "socket.io";


export function registerUserEvents(io: Server, socket: Socket){

    socket.on("disconnect", ()=>{
        console.log("Usuário desconectado", socket.data.user.username);
            io.emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    });
}