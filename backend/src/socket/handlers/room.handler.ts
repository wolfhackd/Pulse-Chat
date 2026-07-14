import type { Server, Socket } from "socket.io";
import { roomService } from "../../modules/rooms/room.routes.js";

//posso fazer outro evento que emite a lista de usuários online
const getOnlineUsers = async (io: Server, roomId: string) => {
    const sockets = await io.in(roomId).fetchSockets();

    return sockets.map(socket => ({
        userId: socket.data.user.userId,
        username: socket.data.user.username,
    }));
};

const updateOnlineUsers = async (io: Server, roomId: string) => {
    const users = await getOnlineUsers(io, roomId);

    io.to(roomId).emit("room:onlineUsers", users);
};

export function registerRoomEvents(io: Server, socket: Socket){

    // console.log("Registrando eventos da sala");

    socket.on('join_room', async (roomId) => {
        try{
            const room = await roomService.findRoomById(roomId);
            if(!room){
                return socket.emit("error_join_room", "Sala não existe");
            }

            socket.join(roomId);

            await updateOnlineUsers(io, roomId);

        } catch (err) {
            console.error(err);
            socket.emit("error", "Erro ao entrar na sala");
        }
    })

   socket.on("leave_room", async (roomId) => {
    socket.leave(roomId);

    io.to(roomId).emit("user_left", {
        username: socket.data.user.username,
        message: `Usuário ${socket.data.user.username} saiu da sala`,
    });

    await updateOnlineUsers(io, roomId);
});
};