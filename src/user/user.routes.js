import { Router } from "express";
import { updateUser, getUsers, deleteUser } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";


const router = Router();

router.put("/updateUser/:uid",validateJWT, updateUser);

router.get("/", validateJWT, getUsers),

router.delete("/:uid",validateJWT, deleteUser);


export default router