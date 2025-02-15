"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/products", productController_1.getProducts);
router.get("/products/search", productController_1.searchProducts); // Add search route
router.post("/products", productController_1.createProduct);
//router.get("/products/:id", getProductById);
//router.put("/products/:id", updateProduct);
//router.delete("/products/:id", deleteProduct);
exports.default = router;
