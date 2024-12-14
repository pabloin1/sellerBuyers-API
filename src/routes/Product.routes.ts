import { Request, Response, Router } from "express";
import {
  createProduct,
  buyProduct,
  getProductByUserId,
  getAllProducts,
} from "../controllers/Product.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    await getAllProducts(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Nueva ruta: ver productos del Seller autenticado
router.get("/", authMiddleware , async (req: Request, res: Response) => {
  try {
      getProductByUserId(req,res)
  } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/",authMiddleware ,async (req: Request, res: Response) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/buy",authMiddleware , async (req: Request, res: Response) => {
  try {
    await buyProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
