import express from "express";
import cors from "cors";
import userRouter from "./routers/user.routes.js";
import messagesRouter from "./routers/messages.routes.js";

const server = express();

// * Middleweres
server.use(express.json());
server.use(cors());

//  * Routes
server.use("/api/auth", userRouter);
server.use("/api/messages", messagesRouter);

export default server;
