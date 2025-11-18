import e from "express";
import { register } from "../controllers/auth.controller.js";

const authRouter = e.Router();

authRouter.post("/register", register);

export default authRouter;