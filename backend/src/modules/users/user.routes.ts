import type { FastifyInstance } from "fastify";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";


const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const usersController  = new UserController(userService);


export const UserRoutes = async (app: FastifyInstance) =>{

    app.post("/users", usersController.createUser);
    
}