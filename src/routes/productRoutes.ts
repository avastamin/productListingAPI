import { Router } from "express";

import { getProducts, filterProducts } from "../controllers/productController";

const router = Router();

router.get("/products", getProducts);
router.get("/products/filter", filterProducts);

export default router;
