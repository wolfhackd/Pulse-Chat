import { hashPassword } from "../../shared/utils/bcrypt.utils.js";
import type { UserRepository } from "./user.repository.js";

export class UserService {
    constructor(readonly userRepository: UserRepository) {}

    createUser = async (username: string, email: string, password: string) => {

        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new Error('Email already exists');
        }
        const usernameExists = await this.userRepository.findByUsername(username);
        if (usernameExists) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await this.userRepository.create({ username, email, password: hashedPassword });

        return newUser;
    }

    getUserByEmail = async (email: string) => {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}