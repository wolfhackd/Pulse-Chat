import type { Server, Socket } from "socket.io";
import { roomService as RoomService } from "../../modules/rooms/room.routes.js";

type Message = {
    // id: number;
    username: string;
    text: string;
    // time: string;
}


export function registerChatEvents(io: Server, socket: Socket){

    socket.on("send_message", async (data)=>{
        try{
            const roomId = String(data.roomId);

            console.log(`Usuário ${socket.data.user.username} enviou uma mensagem para a sala ${roomId}: ${data.message}`);

            const message: Message = {
                username: socket.data.user.username,
                text: data.message,
            };
            RoomService.saveMessage(roomId, socket.data.user.userId, data.message, socket.data.user.username);
            console.log(`Mensagem salva no banco de dados para a sala ${roomId}`);

            io.to(roomId).emit("receive_message", message);
        } 
        catch(err){
        console.error(err);
        socket.emit("error", "Erro ao enviar mensagem");
    }
    })
}