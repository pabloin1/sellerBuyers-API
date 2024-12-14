import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import server from "./Server";
import router from "../routes/";

export default class Server {
  private app: Application;
  private port: string = server.PORT;

  constructor() {
    this.app = express();
    this.port;
    // Definir middlewares y rutas
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser.json({ limit: "1024mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "1024mb" }));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    
    router.forEach((routes) => {
      this.app.use(routes.path, routes.router);
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on port ${this.port}`);
    });
  }
}
