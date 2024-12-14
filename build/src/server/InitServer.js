"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Server_1 = __importDefault(require("./Server"));
const routes_1 = __importDefault(require("../routes/"));
class Server {
    constructor() {
        this.port = Server_1.default.PORT;
        this.app = (0, express_1.default)();
        this.port;
        // Definir middlewares y rutas
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(body_parser_1.default.json({ limit: "1024mb" }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1024mb" }));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        routes_1.default.forEach((routes) => {
            this.app.use(routes.path, routes.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=InitServer.js.map