import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/auth-validator.js";

const router = Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

export default router;