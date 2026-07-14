import type { Server, Socket } from "socket.io";


export function registerUserEvents(io: Server, socket: Socket){

    socket.on("typing:start", (roomId) => {
        socket.to(roomId).emit("typing:start", socket.data.user.username);
    })

    socket.on("typing:stop", (roomId) => {
        socket.to(roomId).emit("typing:stop", {
            username: socket.data.user.username,
    })})

    socket.on("disconnect", ()=>{
            io.emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    })
};