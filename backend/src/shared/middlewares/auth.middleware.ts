import {type FastifyRequest,type FastifyReply} from "fastify";
import { JwtUtil, type UserPayload } from "../utils/jwt.util.js";

interface AuthenticatedRequest extends FastifyRequest {
  user?: UserPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: FastifyReply, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Token not found' });
    }

    const token = authHeader.split(' ')[1] as string;

    try {
    const decoded = JwtUtil.verifyToken(token);

    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token or expired' });
  }
}