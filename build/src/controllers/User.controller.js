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
exports.createSeller = exports.createBuyer = void 0;
const client_1 = __importDefault(require("../db/client"));
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password) {
    return crypto_1.default.createHash('sha256').update(password).digest('hex');
}
// Crear un Buyer
const createBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        const hashedPass = hashPassword(password);
        const newUser = yield client_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPass,
                idRol: 1, // Buyer
            },
        });
        return res.status(201).json({ username, msg: "Buyer creado exitosamente" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createBuyer = createBuyer;
// Crear un Seller
const createSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Faltan campos" });
        }
        const hashedPass = hashPassword(password);
        const newUser = yield client_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPass,
                idRol: 2, // Seller
            },
        });
        return res.status(201).json({ username, msg: "Seller creado exitosamente" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.createSeller = createSeller;
//# sourceMappingURL=User.controller.js.map