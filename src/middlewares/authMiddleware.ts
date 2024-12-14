import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id_user: number;
  rol: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRol?: number;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No se proporcionó un token de autorización" });
    return; // Aquí retornamos void, no el response
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: "Formato de autorización no válido" });
    return;
  }

  const secret = process.env.JWT_SECRET as string;
  
  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    req.userId = decoded.id_user;
    req.userRol = decoded.rol;
    next(); // Continúa con la siguiente ruta/middleware
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token inválido o expirado" });
    return;
  }
};
