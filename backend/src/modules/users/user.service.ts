import { hashPassword } from "../../shared/utils/bcrypt.utils.js";
import type { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(readonly userRepository: UserRepository) {}

    createUser = async (username: string, email: string, password: string) => {

        const hashedPassword = await hashPassword(password);

        const newUser = await this.userRepository.create({ username, email, password: hashedPassword });

        return newUser;
    }

    getUserByEmail = async (email: string) => {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}