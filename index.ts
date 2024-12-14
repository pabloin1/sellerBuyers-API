import env from "dotenv";
env.config();

import Server from "./src/server/InitServer";

const server = new Server();
server.listen();
