import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { Server } from "socket.io";

import { UserRoutes } from "./modules/users/user.routes.js";
import { AuthRoute } from "./modules/auth/auth.route.js";
import { RoomRoutes } from "./modules/rooms/room.routes.js";
import { socketAuth } from "./shared/middlewares/auth.middleware.js";
import { registerConnection } from "./socket/connection.js";

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
io.use(socketAuth);

io.on("connection",(socket)=>{
    registerConnection(io, socket);
})

app.listen({host:"0.0.0.0",port:PORT as number},()=>{
    console.log(`Server running on port ${PORT}`);
});