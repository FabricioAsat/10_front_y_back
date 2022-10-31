import { Router } from "express";
import { getAllUsers, login, register, setAvatar } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/setavatar/:id", setAvatar);
userRouter.get("/users/:id", getAllUsers);

export default userRouter;
