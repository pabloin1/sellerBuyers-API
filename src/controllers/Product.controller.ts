import { Request, Response } from "express";
import prisma from "../db/client"; // Ajusta según tu proyecto


export const getAllProducts = async (req: Request, res: Response): Promise<Response> => { 
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener productos" });
  }
} 


export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, price, stock } = req.body;
    const {userRol} = req;
    console.log(userRol);
    

    if (!name || !price || !stock || !userRol) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Obtenemos el usuario para validar rol
    const user = await prisma.user.findUnique({
      where: { id: Number(userRol) },
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Validar rol Seller
    if (userRol !== 2) {
      return res
        .status(403)
        .json({ error: "No tienes permisos para crear productos" });
    }

    // Crear producto asociado al Seller
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stoke: parseInt(stock),
        idUser: user.id,
      },
    });

    return res
      .status(201)
      .json({ msg: "Producto creado con éxito", product: newProduct });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const buyProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productId, quantity} = req.body;

    const {userRol} = req;

    console.log(userRol);
    
 
    if (!productId || !quantity || !userRol) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userRol) },
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Validar rol Buyer
    if (userRol !== 1) {
      return res
        .status(403)
        .json({ error: "Solo un buyer puede comprar productos" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    // Verificar stock
    const qty = parseInt(quantity);
    if ((product.stoke ?? 0) < qty) {
      return res
        .status(400)
        .json({ error: "No hay suficiente stock del producto" });
    }

    // Actualizar stock
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        stoke: (product.stoke ?? 0) - qty,
      },
    });

    // Aquí podrías agregar lógica para crear un registro de compra, etc.
    // Por ahora solo devolvemos el producto con su stock actualizado.

    return res
      .status(200)
      .json({ msg: "Compra realizada con éxito", product: updatedProduct });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProductByUserId = async(req: Request, res: Response) => {
  try {
    // Verificar que es un Seller
    if (req.userRol !== 2) {
      return res
        .status(403)
        .json({ error: "No tienes permisos para ver estos productos" });
    }

    const products = await prisma.product.findMany({
      where: { idUser: req.userId },
    });

    return res.status(200).json({ products });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};