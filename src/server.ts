import express, { Request, Response } from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const token = req.get("Authorization");

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)",
    });
  }
});
app.get("/api", (req, res) => {
  const help = `
  <pre>
    Welcome to the Products API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /products
    POST /products { Product }
  </pre>
  `;

  res.send(help);
});
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
