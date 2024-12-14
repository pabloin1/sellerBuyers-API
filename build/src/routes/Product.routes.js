"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = require("../controllers/Product.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Product_controller_1.getAllProducts)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
// Nueva ruta: ver productos del Seller autenticado
router.get("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, Product_controller_1.getProductByUserId)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
router.post("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Product_controller_1.createProduct)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
router.delete("/buy", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Product_controller_1.buyProduct)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
exports.default = router;
//# sourceMappingURL=Product.routes.js.map