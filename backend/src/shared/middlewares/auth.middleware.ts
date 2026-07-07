import {type FastifyRequest,type FastifyReply} from "fastify";
import { JwtUtil, type UserPayload } from "../utils/jwt.util.js";
import { Socket } from "socket.io";

export interface AuthenticatedRequest extends FastifyRequest {
  user?: UserPayload;
}



export async function authMiddleware(req: AuthenticatedRequest, res: FastifyReply) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Token not found' });
    }

    const token = authHeader.split(' ')[1] as string;

    try {
    const decoded = JwtUtil.verifyToken(token);

    req.user = decoded;
    
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token or expired' });
  }
}

export async function socketAuth(socket: Socket, next: any){
  try{
    const token = socket.handshake.auth.token;

    if(!token){
      return next(new Error("Token invalid"));
    }

    const payload = JwtUtil.verifyToken(token);

    socket.data.user = payload;

    next();
  }catch(err){    
    next(err);
  }
}