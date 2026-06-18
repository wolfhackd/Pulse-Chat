import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserService } from "./user.service.js";


export class UserController {
    constructor(private readonly userService: UserService) {}

    createUser = async (request: FastifyRequest, reply: FastifyReply) => {

        try{
            //preciso adicionar uma parte dizendo se o email já existe, para não criar usuários duplicados

            const { username, email, password } = request.body as { username: string; email: string; password: string };
            
            if (!username || !email || !password) {
                throw new Error('Missing required fields');
            }
            
            if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                throw new Error('Invalid field types');
            }
            
            if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
                throw new Error('Fields cannot be empty');
            }
            
            const user = await this.userService.createUser(username, email, password);
            
            return reply.status(201).send({ message: 'User created successfully', user });
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: 'Internal server error' });
        }
            

    }
}