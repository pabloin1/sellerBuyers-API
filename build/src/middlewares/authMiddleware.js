"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
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
    const secret = process.env.JWT_SECRET;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.userId = decoded.id_user;
        req.userRol = decoded.rol;
        next(); // Continúa con la siguiente ruta/middleware
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error: "Token inválido o expirado" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map