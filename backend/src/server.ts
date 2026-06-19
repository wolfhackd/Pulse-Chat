import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";

import { UserRoutes } from "./modules/users/user.routes.js";
import { AuthRoute } from "./modules/auth/auth.route.js";
import { JwtUtil, type UserPayload } from "./shared/utils/jwt.util.js";

const PORT = process.env.PORT || 8000;

const app = fastify({logger:true});
app.register(cors, {
    origin: "*"
});

// Routes
app.register(UserRoutes);
app.register(AuthRoute , {prefix:"/auth"});
// app.register(RoomRoutes , {prefix:"/rooms"});

const io = new Server(app.server,{
    cors:{
        origin:"*",
    }
})

//Login
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;

//   if (!token) {
//     return next(new Error("Token não enviado"));
//   }

//   try {
//     const decoded = JwtUtil.verifyToken(token);

//     socket.data.user = decoded;
//     next();
//   } catch {
//     next(new Error("Token inválido"));
//   }
// });

//Posso gerenciar os eventos do socket.io aqui

io.on("connection",(socket)=>{
    console.log("Usuário conectado", socket.id);

   socket.on('join_room', (roomId) =>{
    // socket.join(roomId);
    console.log(`Usuário ${socket.id} entrou na sala`);
    io.to(roomId).emit('user_joined', {
        // username: socket.data.user.username,
         username:socket.id,
        // message: `Usuário ${socket.data.user.username} entrou na sala`
        message: `Usuário ${socket.id} entrou na sala`
    });
   })

   socket.on("send_message", (data) => {
    io.to(data.room).emit(
        "receive_message",
        {
            // id: socket.id,
            // username: socket.data.user.username,
            username:socket.id,
            message: data.message,
        }
    );
    console.log(data.message);
    });

    socket.on("disconnect", (data)=>{
        console.log("Usuário desconectado", socket.id);
            io.emit('user_left', {
            // username: socket.data.user.username,
            username:socket.id,
            // message: `Usuário ${socket.data.user.username} saiu da sala`
            message: `Usuário ${socket.id} saiu da sala`
        });
    })
})

app.listen({host:"0.0.0.0",port:PORT as number},()=>{
    console.log(`Server running on port ${PORT}`);
})