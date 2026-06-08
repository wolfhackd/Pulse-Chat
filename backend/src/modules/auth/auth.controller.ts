import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthService } from "./auth.service.js";


export class AuthController {
    constructor(readonly authService: AuthService) {}

     login = async (req: FastifyRequest, res: FastifyReply) => {

        try{
            const { email, password } = req.body as { email: string; password: string };
            
            if (!email || !password) {
                return res.status(400).send({ error: 'Missing required fields' });
            }
    
            const token = await this.authService.login(email, password);
    
            return res.status(200).send({ token });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        }
}