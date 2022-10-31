import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4096;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chat-app";
