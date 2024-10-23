"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/test.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    req.token = "test-token"; // Check if this causes an error
    next();
});
app.get("/test", (req, res) => {
    res.json({ token: req.token });
});
app.listen(3001, () => {
    console.log("Test server running on http://localhost:3001");
});
