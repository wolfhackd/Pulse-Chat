import type { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { UserRepository } from "../users/user.repository.js";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.js";

const userRepository = new UserRepository();
const service = new AuthService(userRepository);
const controller = new AuthController(service);

export const AuthRoute = async (app: FastifyInstance) => {

    app.post('/login', controller.login)
    app.get('/me',{
        preHandler: authMiddleware
    }, controller.getMe)
}