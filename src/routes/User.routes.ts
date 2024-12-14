import { Request, Response, Router } from "express";
import { createSeller, createBuyer } from "../controllers/User.controller";

const router = Router();

router.post("/buyer", async (req: Request, res: Response) => {
  try {
    await createBuyer(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/seller", async (req: Request, res: Response) => {
  try {
    await createSeller(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
