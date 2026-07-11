import type { Server, Socket } from "socket.io";
import { roomService } from "../modules/rooms/room.routes.js";



export function registerRoomEvents(io: Server, socket: Socket){

    console.log("Registrando eventos da sala");

    socket.on('join_room', async (roomId) => {
        try{
            const room = await roomService.findRoomById(roomId);
            if(!room){
                return socket.emit("error_join_room", "Sala não existe");
            }

            socket.join(roomId);

            io.to(roomId).emit('user_joined', {
                username: socket.data.user.username,
                message: `Usuário ${socket.data.user.username} entrou na sala ${room.roomName}`
            });
        } catch (err) {
            console.error(err);
            socket.emit("error", "Erro ao entrar na sala");
        }
    })

    socket.on("leave_room", (roomId) => {
        socket.leave(roomId);
        console.log(`Usuário ${socket.id} saiu da sala`);
        io.to(roomId).emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    });
};