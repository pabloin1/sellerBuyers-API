import UserRouter from "./User.routes";
import ProductRouter from "./Product.routes";
import AuthRouter from "./Auth.routes";

export default [
  { path: "/api/users", router: UserRouter },
  { path: "/api/products", router: ProductRouter },
  { path: "/api/auth", router: AuthRouter }
];
