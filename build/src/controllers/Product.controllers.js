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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyProduct = exports.createProduct = void 0;
const client_1 = __importDefault(require("@prisma/client")); // Ajusta según tu proyecto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock, userId } = req.body;
        if (!name || !price || !stock || !userId) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        // Obtenemos el usuario para validar rol
        const user = yield client_1.default.user.findUnique({ where: { id: Number(userId) } });
        if (!user)
            return res.status(404).json({ error: "Usuario no encontrado" });
        // Validar rol Seller
        if (user.idRol !== 2) {
            return res.status(403).json({ error: "No tienes permisos para crear productos" });
        }
        // Crear producto asociado al Seller
        const newProduct = yield client_1.default.product.create({
            data: {
                name,
                price: parseFloat(price),
                stoke: parseInt(stock),
                idUser: user.id
            }
        });
        return res.status(201).json({ msg: "Producto creado con éxito", product: newProduct });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createProduct = createProduct;
const buyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { productId, quantity, userId } = req.body;
        if (!productId || !quantity || !userId) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const user = yield client_1.default.user.findUnique({ where: { id: Number(userId) } });
        if (!user)
            return res.status(404).json({ error: "Usuario no encontrado" });
        // Validar rol Buyer
        if (user.idRol !== 1) {
            return res.status(403).json({ error: "Solo un buyer puede comprar productos" });
        }
        const product = yield client_1.default.product.findUnique({ where: { id: Number(productId) } });
        if (!product)
            return res.status(404).json({ error: "Producto no encontrado" });
        // Verificar stock
        const qty = parseInt(quantity);
        if (((_a = product.stoke) !== null && _a !== void 0 ? _a : 0) < qty) {
            return res.status(400).json({ error: "No hay suficiente stock del producto" });
        }
        // Actualizar stock
        const updatedProduct = yield client_1.default.product.update({
            where: { id: product.id },
            data: {
                stoke: ((_b = product.stoke) !== null && _b !== void 0 ? _b : 0) - qty
            }
        });
        // Aquí podrías agregar lógica para crear un registro de compra, etc.
        // Por ahora solo devolvemos el producto con su stock actualizado.
        return res.status(200).json({ msg: "Compra realizada con éxito", product: updatedProduct });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.buyProduct = buyProduct;
//# sourceMappingURL=Product.controllers.js.map