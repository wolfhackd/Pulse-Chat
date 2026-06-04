import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface UserPayload extends JwtPayload {
    username?: string;
    userId?: string;
    email?: string;
}

export const JwtUtil = {

    generateToken: (payload: UserPayload, options?: SignOptions) =>{
        const defaultOptions: SignOptions = {
            expiresIn: '1h'
        };
        return jwt.sign(payload, JWT_SECRET, { ...defaultOptions, ...options });
    },

    verifyToken: (token: string): UserPayload =>{
        try {
            return jwt.verify(token, JWT_SECRET) as UserPayload;
        } catch (err) {
            throw new Error('Invalid token');
        }
    },

   decodeToken(token: string): UserPayload | null {
    return jwt.decode(token) as UserPayload | null;
  }
}


