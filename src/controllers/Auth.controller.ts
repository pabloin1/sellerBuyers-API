import { Request, Response } from "express";
import prisma from "../db/client";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(id_user: number, rol: number): string {
  const secret = process.env.JWT_SECRET as string;
  // Firmamos el JWT con el payload { id_user, rol }
  const token = jwt.sign({ id_user, rol }, secret, { expiresIn: '1d' });
  return token;
}

// Login Buyer
export const loginBuyer = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const user = await prisma.user.findFirst({
      where: { email, idRol: 1 } // rol buyer
    });

    if(!user) {
      return res.status(404).json({ error: "Usuario Buyer no encontrado" });
    }

    const hashedPass = hashPassword(password);
    if(user.password !== hashedPass) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = generateToken(user.id, user.idRol!);

    return res.status(200).json({
      access_token: token,
      
    });
  } catch(error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Login Seller
export const loginSeller = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const user = await prisma.user.findFirst({
      where: { email, idRol: 2 } // rol seller
    });

    if(!user) {
      return res.status(404).json({ error: "Usuario Seller no encontrado" });
    }

    const hashedPass = hashPassword(password);
    if(user.password !== hashedPass) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = generateToken(user.id, user.idRol!);

    return res.status(200).json({
      access_token: token,
    });
  } catch(error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
