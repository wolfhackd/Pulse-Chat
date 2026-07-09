import type { Server, Socket } from "socket.io";




export function registerChatEvents(io: Server, socket: Socket){

    socket.on("send_message", async (data)=>{
        try{
            const roomId = String(data.roomId);

            console.log(`Usuário ${socket.data.user.username} enviou uma mensagem para a sala ${roomId}: ${data.message}`);

            const message = data.message;

            io.to(roomId).emit("receive_message",message);
        }
    catch(err){
        console.error(err);
        socket.emit("error", "Erro ao enviar mensagem");
    }})
}