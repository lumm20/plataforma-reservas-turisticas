import e from "express";
import { login } from "../controllers/login.controller.js";

const loginRouter = e.Router();

loginRouter.post("/login", login);

export default loginRouter;