"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, "../data/products.json");
// Helper function to read products from JSON file
const readProductsFromFile = () => {
    const data = fs_1.default.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
};
let products = readProductsFromFile();
let currentId = 1;
const createProduct = (req, res) => {
    const newProduct = Object.assign({ id: currentId++ }, req.body);
    products.push(newProduct);
    res.status(201).json(newProduct);
};
exports.createProduct = createProduct;
const getProducts = (req, res) => {
    return res.json({ results: products });
    return;
};
exports.getProducts = getProducts;
const getProductById = (req, res) => {
    const product = products.find((u) => u.id === +req.params.id);
    if (!product)
        return res.status(404).send("Product not found");
    res.json(product);
};
exports.getProductById = getProductById;
const updateProduct = (req, res) => {
    const productIndex = products.findIndex((u) => u.id === +req.params.id);
    if (productIndex === -1)
        return res.status(404).send("Product not found");
    products[productIndex] = Object.assign({ id: products[productIndex].id }, req.body);
    res.json(products[productIndex]);
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    const productIndex = products.findIndex((u) => u.id === +req.params.id);
    if (productIndex === -1)
        return res.status(404).send("Product not found");
    products.splice(productIndex, 1);
    res.status(204).send();
};
exports.deleteProduct = deleteProduct;
// Search products by a search term
const searchProducts = (req, res) => {
    const { term } = req.query;
    if (!term || typeof term !== "string") {
        return res.status(400).json({ message: "Search term is required" });
    }
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()));
    res.json(filteredProducts);
};
exports.searchProducts = searchProducts;
