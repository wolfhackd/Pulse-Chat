import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthService } from "./auth.service.js";
import type { AuthenticatedRequest } from "../../shared/middlewares/auth.middleware.js";


export class AuthController {
    constructor(readonly authService: AuthService) {}

    login = async (req: FastifyRequest, reply: FastifyReply) => {

        try{
            const { email, password } = req.body as { email: string; password: string };
            
            if (!email || !password) {
               throw new Error('Missing required fields');
            }

            if (typeof email !== 'string' || typeof password !== 'string') {
                throw new Error('Invalid field types');
            }

            if (email.trim() === '' || password.trim() === '') {
                throw new Error('Fields cannot be empty');
            }
            //salvar em cookie
            const token = await this.authService.login(email, password);

            return reply.status(200).send({ token });

        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(401).send({ error: 'Invalid email or password' });
        }
    }

    getMe = async (req: AuthenticatedRequest, reply: FastifyReply) =>{
        try{
            return reply.status(200).send({ user: req.user });
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: 'Internal server error' });
        }
    }
}