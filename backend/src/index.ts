import fastify from "fastify";
import { Server } from "socket.io";



const app = fastify();

const io = new Server(app.server,{
    cors:{
        origin:"*",
    }
})

//Posso gerenciar os eventos do socket.io aqui

io.on("connection",(socket)=>{
    console.log("Usuário conectado", socket.id);

    socket.on("send_message",(message)=>{
        io.emit("receive_message", {
            message,
            id: socket.id,
        })
    })
})


app.listen({port:3333},()=>{
    console.log("Server is running on port localhost:3333");    
})