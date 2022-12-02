import { createApp } from "@src/app.js";
import { dbConfig } from "@src/config/dbConfig.js";
import { port } from "@src/config/server.js";
import { Server } from "@src/server.js";

const server = new Server(await createApp());

await server.start(port);

console.log(`[server]: Server is running at ${server.url}`);

dbConfig();

export default server;
