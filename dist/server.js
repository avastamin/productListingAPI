"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    const token = req.get("Authorization");
    if (token) {
        req.token = token;
        next();
    }
    else {
        res.status(403).send({
            error: "Please provide an Authorization header to identify yourself (can be whatever you want)",
        });
    }
});
app.use("/api", productRoutes_1.default);
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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
