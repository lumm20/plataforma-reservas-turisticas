import e from "express";
import { register } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/register", register);

export default router;