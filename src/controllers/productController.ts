import fs from "fs";
import path from "path";
import { Product } from "./../models/product";

const dataFilePath = path.join(__dirname, "../data/products.json");

// Helper function to read products from JSON file
const readProductsFromFile = (): Product[] => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

let products: Product[] = readProductsFromFile();
let currentId = 1;

export const createProduct = (req, res) => {
  const newProduct: Product = { id: currentId++, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const getProducts = (req, res) => {
  return res.json({ results: products });
  return;
};

export const getProductById = (req, res) => {
  const product = products.find((u) => u.id === +req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
};

export const updateProduct = (req, res) => {
  const productIndex = products.findIndex((u) => u.id === +req.params.id);
  if (productIndex === -1) return res.status(404).send("Product not found");

  products[productIndex] = { id: products[productIndex].id, ...req.body };
  res.json(products[productIndex]);
};

export const deleteProduct = (req, res) => {
  const productIndex = products.findIndex((u) => u.id === +req.params.id);
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.status(204).send();
};

// Search products by a search term
export const searchProducts = (req, res) => {
  const { term } = req.query;
  if (!term || typeof term !== "string") {
    return res.status(400).json({ message: "Search term is required" });
  }

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
  );

  res.json({ results: filteredProducts });
};

// Filter products by name and price range
export const filterProducts = (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  // Filter by name if provided
  let filteredProducts = products;
  if (name && typeof name === "string") {
    filteredProducts = filteredProducts.filter((product: any) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by category if provided
  if (category && typeof category === "string") {
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by price range if provided
  if (minPrice && !isNaN(Number(minPrice))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.price >= Number(minPrice)
    );
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.price <= Number(maxPrice)
    );
  }

  res.json({ results: filteredProducts });
};
