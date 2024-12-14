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
const Auth_controller_1 = require("../controllers/Auth.controller");
const router = (0, express_1.Router)();
router.post("/buyer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Auth_controller_1.loginBuyer)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
router.post("/seller", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, Auth_controller_1.loginSeller)(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}));
exports.default = router;
//# sourceMappingURL=Auth.routes.js.map