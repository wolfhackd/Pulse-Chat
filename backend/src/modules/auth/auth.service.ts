import { comparePassword } from "../../shared/utils/bcrypt.utils.js";
import { JwtUtil } from "../../shared/utils/jwt.util.js";
import type { UserRepository } from "../users/user.repository.js";


export class AuthService {
    constructor(readonly userRepository: UserRepository) {}

     login = async (email: string, password: string) => {

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = JwtUtil.generateToken(user);
        return token;
    }
}