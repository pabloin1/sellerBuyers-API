import { Request, Response, Router } from "express";
import { loginBuyer, loginSeller } from "../controllers/Auth.controller";

const router = Router();

router.post("/buyer", async (req: Request, res: Response) => {
  try {
    await loginBuyer(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/seller", async (req: Request, res: Response) => {
  try {
    await loginSeller(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
