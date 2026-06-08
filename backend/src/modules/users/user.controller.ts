import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserService } from "./user.service.js";


export class UserController {
    constructor(private readonly userService: UserService) {}

    createUser = async (request: FastifyRequest, reply: FastifyReply) => {

        try{

            const { username, email, password } = request.body as { username: string; email: string; password: string };
            
            if (!username || !email || !password) {
                throw new Error('Missing required fields');
            }
            
            const user = await this.userService.createUser(username, email, password);
            
            return reply.status(201).send({ message: 'User created successfully', user });
        } catch (error) {
            return reply.status(500).send({ error: 'Internal server error' });
        }
            

    }
}