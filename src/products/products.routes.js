import { Router } from "express";
import {  createProduct, getProducts, getProductById, updateProduct,  deleteProduct,  getSoldOutProducts,  getBestSellingProducts } from "../products/products.controller.js";
import { validateJWT } from "../middleware/validate-jwt.js";

const router = Router();

router.post("/create", validateJWT, createProduct);
router.get("/", validateJWT, getProducts);
router.get("/out-of-stock", validateJWT, getSoldOutProducts);
router.get("/top-sellers", validateJWT, getBestSellingProducts);
router.get("/:productId", validateJWT, getProductById);
router.put("/update/:productId", validateJWT, updateProduct);
router.delete("/remove/:productId", validateJWT, deleteProduct);

export default router;
