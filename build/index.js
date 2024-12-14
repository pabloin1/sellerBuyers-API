"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const InitServer_1 = __importDefault(require("./src/server/InitServer"));
const server = new InitServer_1.default();
server.listen();
//# sourceMappingURL=index.js.map