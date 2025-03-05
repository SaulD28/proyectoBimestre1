import { Router } from "express";
import { addItemToCart, getUserCart, removeItemFromCart } from "../cart/cart.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

router.post("/addProduct", validateJWT, addItemToCart);
router.get("/", validateJWT, getUserCart);
router.delete("/removeProduct", validateJWT, removeItemFromCart);

export default router;