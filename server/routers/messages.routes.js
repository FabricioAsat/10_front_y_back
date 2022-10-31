import { Router } from "express";
import { addMessage, getAllMessages } from "../controllers/messages.controllers.js";

const messagesRouter = Router();

messagesRouter.post("/addmessage", addMessage);
messagesRouter.post("/getallmessage", getAllMessages);

export default messagesRouter;
