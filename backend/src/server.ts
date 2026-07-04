import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";

import { UserRoutes } from "./modules/users/user.routes.js";
import { AuthRoute } from "./modules/auth/auth.route.js";
import { JwtUtil, type UserPayload } from "./shared/utils/jwt.util.js";
import { RoomRoutes, roomService } from "./modules/rooms/room.routes.js";

const PORT = process.env.PORT || 8000;

const app = fastify();
app.register(cors, {
    origin: "*"
});

// Routes
app.register(UserRoutes);
app.register(AuthRoute , {prefix:"/auth"});
app.register(RoomRoutes , {prefix:"/rooms"});

const io = new Server(app.server,{
    cors:{
        origin:"*",
    }
})

//Login
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Token não enviado"));
  }

  try {
    const decoded = JwtUtil.verifyToken(token);

    socket.data.user = decoded;
    next();
  } catch {
    next(new Error("Token inválido"));
  }
});

//Posso gerenciar os eventos do socket.io aqui

io.on("connection",(socket)=>{
    console.log("Usuário conectado", socket.data.user);

    //Verificar se a sala existe antes de permitir que o usuário entre nela
    socket.on('join_room', async (roomId) =>{
        try {
            const room = await roomService.findRoomById(roomId);
            if(!room){
                return socket.emit("error_join_room", "Sala não existe"); // -----------------------------------------------------------------------
            }
    
    
            await socket.join(roomId);
            console.log(`Usuário ${socket.data.user.username} entrou na sala ${room.roomName}`);
    
            io.to(roomId).emit('user_joined', {
                username: socket.data.user.username,
                message: `Usuário ${socket.data.user.username} entrou na sala ${room.roomName}`
            });
        } catch (err) {
            console.error(err);
            socket.emit("error", "Erro ao entrar na sala");
        }}
    )

    socket.on("send_message", async (data) =>{
        //Tenho que fazer uma chamada para verificar se o usuário está na sala antes de salvar a mensagem no banco de dados
        //Se o usuário não estiver na sala, não salvar a mensagem no banco de dados e retornar um erro
        // if(!socket.rooms.has(data.roomId)){
        //     return socket.emit("error", "Usuário nao esta na sala");
        // }
        const message = await roomService.saveMessage(data.roomId, socket.data.user.userId, data.message, socket.data.user.username)
        console.log("Mensagem salva no banco de dados:", message);
        io.to(data.roomId).emit("receive_message", message);
    })


    socket.on("leave_room", (roomId) => {
        socket.leave(roomId);
        console.log(`Usuário ${socket.id} saiu da sala`);
        io.to(roomId).emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    })

    socket.on("disconnect", ()=>{
        console.log("Usuário desconectado", socket.id);
            io.emit('user_left', {
            username: socket.data.user.username,
            message: `Usuário ${socket.data.user.username} saiu da sala`
        });
    })
})

app.listen({host:"0.0.0.0",port:PORT as number},()=>{
    console.log(`Server running on port ${PORT}`);
})