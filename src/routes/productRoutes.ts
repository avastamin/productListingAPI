import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
} from "../controllers/productController";

const router = Router();

router.get("/products", getProducts);
router.get("/products/search", searchProducts); // Add search route
router.get("/products/filter", filterProducts); // Add search route
router.post("/products", createProduct);
//router.get("/products/:id", getProductById);
//router.put("/products/:id", updateProduct);
//router.delete("/products/:id", deleteProduct);

export default router;
