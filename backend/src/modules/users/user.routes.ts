import type { FastifyInstance } from "fastify";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";


const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const usersController  = new UserController(userService);


export const UserRoutes = async (app: FastifyInstance) =>{

    app.post("/users", usersController.createUser);
    //Falta implementar as rotas de login, esqueci minha senha e resetar senha
    // app.post("/forgot-password", usersController.forgotPassword);
    //verifica o email e gera um token temporario para resetar a senha
    // app.post("/reset-password", usersController.resetPassword);
    //verifica o token e permite o usuário criar uma nova senha
    
}