import { Request, Response } from "express";
import prisma from "../db/client"; 
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Crear un Buyer
export const createBuyer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const hashedPass = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
        idRol: 1, // Buyer
      },
    });

    return res.status(201).json({ username, msg: "Buyer creado exitosamente" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un Seller
export const createSeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const hashedPass = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
        idRol: 2, // Seller
      },
    });

    return res.status(201).json({ username, msg: "Seller creado exitosamente" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};