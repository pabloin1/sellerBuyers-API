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
exports.loginSeller = exports.loginBuyer = void 0;
const client_1 = __importDefault(require("../db/client"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hashPassword(password) {
    return crypto_1.default.createHash('sha256').update(password).digest('hex');
}
function generateToken(id_user, rol) {
    const secret = process.env.JWT_SECRET;
    // Firmamos el JWT con el payload { id_user, rol }
    const token = jsonwebtoken_1.default.sign({ id_user, rol }, secret, { expiresIn: '1d' });
    return token;
}
// Login Buyer
const loginBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        const user = yield client_1.default.user.findFirst({
            where: { email, idRol: 1 } // rol buyer
        });
        if (!user) {
            return res.status(404).json({ error: "Usuario Buyer no encontrado" });
        }
        const hashedPass = hashPassword(password);
        if (user.password !== hashedPass) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        // Generar el token JWT
        const token = generateToken(user.id, user.idRol);
        return res.status(200).json({
            access_token: token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.loginBuyer = loginBuyer;
// Login Seller
const loginSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        const user = yield client_1.default.user.findFirst({
            where: { email, idRol: 2 } // rol seller
        });
        if (!user) {
            return res.status(404).json({ error: "Usuario Seller no encontrado" });
        }
        const hashedPass = hashPassword(password);
        if (user.password !== hashedPass) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        // Generar el token JWT
        const token = generateToken(user.id, user.idRol);
        return res.status(200).json({
            access_token: token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.loginSeller = loginSeller;
//# sourceMappingURL=Auth.controller.js.map