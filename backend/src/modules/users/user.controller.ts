import type { UserService } from "./user.service.js";


export class UserController {
    constructor(private readonly userService: UserService) {}

    createUser = async (request: any, reply: any) => {

        try{

            const { username, email, password } = request.body;
            
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