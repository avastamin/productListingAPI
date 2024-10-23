import fs from "fs";
import path from "path";
import { Product } from "./../models/product";

import { Request, Response } from "express";

const dataFilePath = path.join(__dirname, "../data/products.json");

// Helper function to read products from JSON file
const readProductsFromFile = (): Product[] => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

let products: Product[] = readProductsFromFile();
let currentId = 1;

export const createProduct = (req: Request, res: Response) => {
  const newProduct: Product = { id: currentId++, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
  const product = products.find((u) => u.id === +req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const productIndex = products.findIndex((u) => u.id === +req.params.id);
  if (productIndex === -1) return res.status(404).send("Product not found");

  products[productIndex] = { id: products[productIndex].id, ...req.body };
  res.json(products[productIndex]);
};

export const deleteProduct = (req: Request, res: Response) => {
  const productIndex = products.findIndex((u) => u.id === +req.params.id);
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.status(204).send();
};
