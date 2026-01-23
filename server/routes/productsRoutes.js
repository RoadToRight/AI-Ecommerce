import express from "express";
import { createProduct, deleteProducts, fetchAllProducts, SingleProductAPI } from "../controllers/productController.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.get("/products/all", fetchAllProducts)
app.post("/products/create", isAuthenticated, authorizedRoles("Admin"), createProduct)
app.delete("/products/delete/:id", deleteProducts)
app.get("/collection/:collection/product/:slug", SingleProductAPI)

export default app;