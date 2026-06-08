import { comparePassword } from "../../shared/utils/bcrypt.utils.js";
import { JwtUtil } from "../../shared/utils/jwt.util.js";
import type { UserRepository } from "../users/user.repository.js";


export class AuthService {
    constructor(readonly userRepository: UserRepository) {}

     login = async (email: string, password: string) => {
        //achar o usuário no banco de dados
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        //comparar a senha
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        //gerar um token JWT
        const token = await JwtUtil.generateToken(user);
        return token;
    }
}