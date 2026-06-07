import { hashPassword } from "../../shared/utils/bcrypt.utils.js";
import type { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(readonly userRepository: UserRepository) {}

    async createUser(username: string, email: string, password: string) {

        const hashedPassword = await hashPassword(password);

        const newUser = await this.userRepository.create({ username, email, password: hashedPassword });

        return newUser;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}