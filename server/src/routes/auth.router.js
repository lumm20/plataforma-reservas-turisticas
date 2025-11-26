import e from "express";
import { register } from "../controllers/auth.controller.js";
import { validateUser, checkResults } from "../middlewares/validators/userValidator.js";

const authRouter = e.Router();

authRouter.post("/register", 
    validateUser(),
    checkResults, 
    register);

export default authRouter;