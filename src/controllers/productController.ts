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

export const getProducts = (req, res) => {
  return res.json({ results: products });
  return;
};

// Filter products by search terms, name, price range and ratings
export const filterProducts = (req, res) => {
  const { term, name, minPrice, maxPrice, rating } = req.query;

  // Filter by name if provided
  let filteredProducts = products;
  if (term && typeof term === "string") {
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );
  }
  if (name && typeof name === "string") {
    filteredProducts = filteredProducts.filter((product: any) =>
      product.name.toLowerCase().includes(name.toLowerCase())
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
  // Filter by rating
  if (rating && !isNaN(Number(rating))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.review >= Number(rating)
    );
  }

  res.json({ results: filteredProducts });
};
