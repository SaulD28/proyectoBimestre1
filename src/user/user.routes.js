import { Router } from "express";
import { updateUser, getUsers, deleteUser } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {  } from "../middlewares/auth-validator.js";

const router = Router();

router.put("/:uid", validateJWT, updateUser);

router.get("/", validateJWT, getUsers);

router.delete("/delete/:uid", validateJWT, deleteUser);

export default router;
