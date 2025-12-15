import express from "express";
import { createProduct, fetchAllProducts } from "../controllers/productController.js";

const app = express.Router();

app.get("/all", fetchAllProducts)
app.post("/create", createProduct)
export default app;