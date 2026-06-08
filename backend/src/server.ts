import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import { Server } from "socket.io";

import { UserRoutes } from "./modules/users/user.routes.js";
import prisma from "./database/db.js";
import { AuthRoute } from "./modules/auth/auth.route.js";



const app = fastify({logger:true});

// Routes
app.register(UserRoutes);
app.register(AuthRoute);

// const io = new Server(app.server,{
//     cors:{
//         origin:"*",
//     }
// })

app.get("/test",(request,reply)=>{
    return reply.send({message:"Hello World"});
})

app.get("/test-db",async (request,reply)=>{
    try {
        const users = await prisma.user.count();

        return reply.send({message: `Total de usuários: ${users}`});
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return reply.status(500).send({ message: "Erro ao buscar usuários" });
    }
});

//Posso gerenciar os eventos do socket.io aqui

// io.on("connection",(socket)=>{
//     console.log("Usuário conectado", socket.id);

//     socket.on("send_message",(message)=>{
//         io.emit("receive_message", {
//             message,
//             id: socket.id,
//         })
//     })
// })


app.listen({port:3333},()=>{
    console.log("Server is running on port localhost:3333");    
})