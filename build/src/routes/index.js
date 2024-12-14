"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_routes_1 = __importDefault(require("./User.routes"));
const Product_routes_1 = __importDefault(require("./Product.routes"));
const Auth_routes_1 = __importDefault(require("./Auth.routes"));
exports.default = [
    { path: "/api/users", router: User_routes_1.default },
    { path: "/api/products", router: Product_routes_1.default },
    { path: "/api/auth", router: Auth_routes_1.default }
];
//# sourceMappingURL=index.js.map