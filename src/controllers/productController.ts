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
  // Sending a JSON response containing the list of products
  return res.json({ results: products });
};

// Filter products based on search terms, name, price range, and ratings
export const filterProducts = (req, res) => {
  // Destructure query parameters from the request
  const { term, name, minPrice, maxPrice, rating } = req.query;

  /// Initialize filteredProducts with the full list of products
  let filteredProducts = products;

  // Filter by search term if provided
  if (term && typeof term === "string") {
    filteredProducts = filteredProducts.filter(
      (product: any) =>
        product.name.toLowerCase().includes(term.toLowerCase()) || // Check if the term is in the product name
        product.description.toLowerCase().includes(term.toLowerCase()) // Check if the term is in the product description
    );
  }
  // Filter by exact name match if provided
  if (name && typeof name === "string") {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.name.toLowerCase().includes(name.toLowerCase()) // Check if the name is in the product name
    );
  }

  // Filter by minimum price if provided
  if (minPrice && !isNaN(Number(minPrice))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.price >= Number(minPrice)
    );
  }

  // Filter by maximum price if provided
  if (maxPrice && !isNaN(Number(maxPrice))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.price <= Number(maxPrice)
    );
  }
  // Filter by rating if provided
  if (rating && !isNaN(Number(rating))) {
    filteredProducts = filteredProducts.filter(
      (product: any) => product.review >= Number(rating)
    );
  }

  // Send the filtered results back to the client
  res.json({ results: filteredProducts });
};
